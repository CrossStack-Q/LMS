// // File: internal/ws/hub.go
// package ws

// import (
// 	"encoding/json"
// 	"log"
// 	"time"
// )

// func (h *Hub) Run() {
// 	ticker := time.NewTicker(30 * time.Second)
// 	defer ticker.Stop()
// 	for {
// 		select {
// 		case c := <-h.register:
// 			h.mu.Lock()
// 			if _, ok := h.clients[c.userID]; !ok {
// 				h.clients[c.userID] = make(map[*Client]bool)
// 			}
// 			h.clients[c.userID][c] = true
// 			h.mu.Unlock()

// 			// broadcast presence online
// 			pres := WSMessage{
// 				Event: "presence",
// 				Data: map[string]interface{}{
// 					"user_id":   c.userID,
// 					"online":    true,
// 					"last_seen": nil,
// 				},
// 			}
// 			b, _ := json.Marshal(pres)
// 			// send to everyone (you can restrict to peers later)
// 			h.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}

// 			log.Printf("user %s connected (total sessions: %d)", c.userID, len(h.clients[c.userID]))

// 		case c := <-h.unregister:
// 			h.mu.Lock()
// 			if cls, ok := h.clients[c.userID]; ok {
// 				if _, exists := cls[c]; exists {
// 					delete(cls, c)
// 					close(c.send)
// 				}
// 				if len(cls) == 0 {
// 					delete(h.clients, c.userID)
// 					// broadcast presence offline with last_seen
// 					pres := WSMessage{
// 						Event: "presence",
// 						Data: map[string]interface{}{
// 							"user_id":   c.userID,
// 							"online":    false,
// 							"last_seen": time.Now().UTC(),
// 						},
// 					}
// 					b, _ := json.Marshal(pres)
// 					h.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}
// 					log.Printf("user %s disconnected (offline)", c.userID)
// 				} else {
// 					log.Printf("user %s disconnected (still %d sessions)", c.userID, len(cls))
// 				}
// 			}
// 			h.mu.Unlock()

// 		case env := <-h.broadcast:
// 			// env.TargetUserIDs == nil -> broadcast to all connected clients
// 			if env.TargetUserIDs == nil {
// 				h.mu.RLock()
// 				for _, cls := range h.clients {
// 					for cl := range cls {
// 						select {
// 						case cl.send <- env.Payload:
// 						default:
// 							h.unregister <- cl
// 						}
// 					}
// 				}
// 				h.mu.RUnlock()
// 				continue
// 			}

// 			// targeted broadcast
// 			for _, uid := range env.TargetUserIDs {
// 				h.mu.RLock()
// 				clients, ok := h.clients[uid]
// 				h.mu.RUnlock()
// 				if !ok {
// 					continue
// 				}
// 				for cl := range clients {
// 					select {
// 					case cl.send <- env.Payload:
// 					default:
// 						h.unregister <- cl
// 					}
// 				}
// 			}
// 		case <-ticker.C:
// 			// optional: cleanup logic or heartbeats
// 		}
// 	}
// }

package ws

import (
	"encoding/json"
	"log"
	"sync"
	"time"
)

type Hub struct {
	clients    map[string]map[*Client]bool
	register   chan *Client
	unregister chan *Client
	broadcast  chan *Envelope

	mu sync.RWMutex
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[string]map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		broadcast:  make(chan *Envelope, 256),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case c := <-h.register:
			h.mu.Lock()
			if _, ok := h.clients[c.userID]; !ok {
				h.clients[c.userID] = make(map[*Client]bool)
			}
			h.clients[c.userID][c] = true
			h.mu.Unlock()

			// Broadcast presence
			msg := WSMessage{
				Event: "presence",
				Data: map[string]interface{}{
					"user_id":   c.userID,
					"online":    true,
					"last_seen": nil,
				},
			}
			b, _ := json.Marshal(msg)
			h.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}

			log.Println("WS connected:", c.userID)

		case c := <-h.unregister:
			h.mu.Lock()
			if group, ok := h.clients[c.userID]; ok {
				if _, exists := group[c]; exists {
					delete(group, c)
					close(c.send)
				}
				if len(group) == 0 {
					delete(h.clients, c.userID)

					msg := WSMessage{
						Event: "presence",
						Data: map[string]interface{}{
							"user_id":   c.userID,
							"online":    false,
							"last_seen": time.Now(),
						},
					}
					b, _ := json.Marshal(msg)
					h.broadcast <- &Envelope{TargetUserIDs: nil, Payload: b}
					log.Println("WS offline:", c.userID)
				}
			}
			h.mu.Unlock()

		case env := <-h.broadcast:
			// nil → broadcast to all
			if env.TargetUserIDs == nil {
				h.mu.RLock()
				for _, group := range h.clients {
					for cl := range group {
						cl.send <- env.Payload
					}
				}
				h.mu.RUnlock()
				continue
			}

			// targeted broadcast
			for _, uid := range env.TargetUserIDs {
				h.mu.RLock()
				group := h.clients[uid]
				h.mu.RUnlock()

				for cl := range group {
					cl.send <- env.Payload
				}
			}
		}
	}
}
