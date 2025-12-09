// File: internal/ws/handler.go
package ws

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"log"

	"github.com/CrossStack-Q/LMS/goSupport/internal/middleware"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type WSHandler struct {
	Hub *Hub
	// Database hooks
	SaveMessage          func(ctx context.Context, msg *MessagePayload) error
	MarkMessageDelivered func(ctx context.Context, messageID string, deliveredAt time.Time) error
	MarkMessageRead      func(ctx context.Context, messageID string, readAt time.Time) error
	// rate limits, etc. could be injected
}

func NewWSHandler(h *Hub) *WSHandler {
	return &WSHandler{Hub: h}
}

// helper to verify JWT token (simple)
func verifyToken(tokenStr string) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev_secret" // change in prod
	}
	tokenStr = strings.TrimSpace(tokenStr)
	if tokenStr == "" {
		return "", errors.New("empty token")
	}
	// parse without custom claims
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil || !token.Valid {
		return "", errors.New("invalid token")
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid claims")
	}
	// we expect "sub" or "user_id"
	if sub, ok := claims["sub"].(string); ok && sub != "" {
		return sub, nil
	}
	if uid, ok := claims["user_id"].(string); ok && uid != "" {
		return uid, nil
	}
	return "", errors.New("user not found in token")
}

// ServeWS upgrades and authenticates via ?token=JWT (you selected query param)
func (h *WSHandler) ServeWS(w http.ResponseWriter, r *http.Request) {
	token := r.URL.Query().Get("token")
	if token == "" {
		http.Error(w, "token missing", http.StatusUnauthorized)
		return
	}
	claims, err := middleware.ParseJWT(token)
	if err != nil {
		http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
		return
	}

	userID := claims

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	client := &Client{
		hub:    h.Hub,
		conn:   conn,
		send:   make(chan []byte, 256),
		userID: userID,
		// init per-client rate limiter
		lastMessages: make([]time.Time, 0, 32),
	}

	log.Printf("WS connected: user=%s remote=%s", userID, conn.RemoteAddr().String())

	// Register with hub
	h.Hub.register <- client

	// Start pumps
	go client.writePump()
	go client.readPump(func(message []byte, c *Client) {
		h.handleIncoming(message, c)
	})
}

// handleIncoming processes JSON events from client
func (h *WSHandler) handleIncoming(raw []byte, c *Client) {
	// rate limit per-client: basic sliding window (10 messages / 1s)
	now := time.Now()
	c.pruneMessageWindow(now)
	if len(c.lastMessages) > 10 {
		// too many messages
		resp := WSMessage{
			Event: "rate_limit",
			Data: map[string]interface{}{
				"message":     "rate limit exceeded",
				"retry_after": 1,
			},
		}
		b, _ := json.Marshal(resp)
		select {
		case c.send <- b:
		default:
			// drop
		}
		return
	}
	// record message timestamp for rate limiting
	c.lastMessages = append(c.lastMessages, now)

	var wsmsg WSMessage
	if err := json.Unmarshal(raw, &wsmsg); err != nil {
		return
	}

	switch wsmsg.Event {
	case "message":
		// parse payload into MessagePayload
		payloadBytes, _ := json.Marshal(wsmsg.Data)
		var mp MessagePayload
		if err := json.Unmarshal(payloadBytes, &mp); err != nil {
			return
		}

		// server assigns ID + timestamps + status
		mp.ID = uuid.NewString()
		mp.Status = "sent"
		mp.CreatedAt = time.Now().UTC()

		// Persist via hook (if available)
		if h.SaveMessage != nil {
			ctx := context.Background()
			if err := h.SaveMessage(ctx, &mp); err != nil {
				// persist error -> log and continue (we still broadcast)
				log.Printf("SaveMessage error: %v", err)
			}
		}

		// Send ACK back to sender with server ID (sender uses tempId to reconcile)
		ackPayload := map[string]interface{}{
			"id":     mp.ID,
			"status": mp.Status,
		}
		// include tempId if client provided one
		if tmp, ok := wsmsg.Data.(map[string]interface{})["tempId"]; ok {
			ackPayload["tempId"] = tmp
		}
		ack := WSMessage{Event: "message_ack", Data: ackPayload}
		ackB, _ := json.Marshal(ack)

		// Send ack only to sender (mp.SenderID should equal c.userID)
		hubEnvAck := &Envelope{
			TargetUserIDs: []string{mp.SenderID},
			Payload:       ackB,
		}
		h.Hub.broadcast <- hubEnvAck

		// Now broadcast the actual message to recipient and sender (so both see it)
		out := WSMessage{Event: "message", Data: mp}
		b, _ := json.Marshal(out)
		env := &Envelope{
			TargetUserIDs: []string{mp.RecipientID, mp.SenderID},
			Payload:       b,
		}
		h.Hub.broadcast <- env

	case "delivered":
		// recipient notifies server they've received a message
		payloadBytes, _ := json.Marshal(wsmsg.Data)
		var d struct {
			MessageID string `json:"message_id"`
			TempID    string `json:"tempId"`
		}
		_ = json.Unmarshal(payloadBytes, &d)
		if d.MessageID == "" {
			return
		}
		// update DB and notify sender
		if h.MarkMessageDelivered != nil {
			_ = h.MarkMessageDelivered(context.Background(), d.MessageID, time.Now().UTC())
		}
		statusMsg := WSMessage{
			Event: "message_status",
			Data: map[string]interface{}{
				"message_id": d.MessageID,
				"tempId":     d.TempID,
				"status":     "delivered",
				"at":         time.Now().UTC(),
			},
		}
		b, _ := json.Marshal(statusMsg)
		// we need to send to the message sender — to find sender we could query DB, but in this simplified flow
		// the client included sender_id in delivered event optionally; if not provided we broadcast to all.
		var targetIDs []string
		if t, ok := wsmsg.Data.(map[string]interface{})["sender_id"].(string); ok && t != "" {
			targetIDs = []string{t}
		} else {
			// best-effort: broadcast to all (suboptimal). In prod fetch message sender from DB.
			// here we send to all connected to ensure sender gets it.
			h.Hub.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}
			return
		}
		h.Hub.broadcast <- &Envelope{TargetUserIDs: targetIDs, Payload: b}

	case "read":
		payloadBytes, _ := json.Marshal(wsmsg.Data)
		var r struct {
			MessageIDs []string `json:"message_ids"`
			SenderID   string   `json:"sender_id"`
			TempID     string   `json:"tempId"`
		}
		_ = json.Unmarshal(payloadBytes, &r)
		for _, mid := range r.MessageIDs {
			if h.MarkMessageRead != nil {
				_ = h.MarkMessageRead(context.Background(), mid, time.Now().UTC())
			}
			statusMsg := WSMessage{
				Event: "message_status",
				Data: map[string]interface{}{
					"message_id": mid,
					"status":     "read",
					"tempId":     r.TempID,
					"at":         time.Now().UTC(),
				},
			}
			b, _ := json.Marshal(statusMsg)
			target := r.SenderID
			if target == "" {
				// same as delivered: best-effort broadcast if sender unknown
				h.Hub.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}
			} else {
				h.Hub.broadcast <- &Envelope{TargetUserIDs: []string{target}, Payload: b}
			}
		}

	case "typing":
		// forward typing to recipient (include conversation_id and typing boolean)
		payloadBytes, _ := json.Marshal(wsmsg.Data)
		var t struct {
			ConversationID string `json:"conversation_id"`
			RecipientID    string `json:"recipient_id"`
			Typing         bool   `json:"typing"`
		}
		_ = json.Unmarshal(payloadBytes, &t)
		out := WSMessage{Event: "typing", Data: t}
		b, _ := json.Marshal(out)
		h.Hub.broadcast <- &Envelope{TargetUserIDs: []string{t.RecipientID}, Payload: b}

	default:
		// ignore
	}
}
