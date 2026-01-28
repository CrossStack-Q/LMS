package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/go-chi/chi/v5"
)

type startConversationReq struct {
	SenderID    string `json:"sender_id"`
	ReceiverID  string `json:"receiver_id"`
	Message     string `json:"message"`
	MessageType string `json:"message_type"` // optional
}

// Response DTO
type startConversationResp struct {
	Conversation *models.Conversation `json:"conversation"`
	Message      *models.Message      `json:"message"`
}

type ChatHandler struct {
	chatSvc *services.ChatService
}

func NewChatHandler(chatSvc *services.ChatService) *ChatHandler {
	return &ChatHandler{chatSvc: chatSvc}
}

// ------------------------------------------------------------
// Register Routes
// ------------------------------------------------------------
func (h *ChatHandler) RegisterRoutes(r chi.Router) {
	r.Post("/chat/conversation", h.CreateConversation)
	r.Get("/chat/conversations", h.ListUserConversations)

	r.Post("/chat/message", h.SendMessage)
	r.Get("/chat/messages/{conversationID}", h.GetMessages)

	// New Wala Old Wala old version will be removed soon .. Bye Bye  Go Goa Gone

	r.Post("/chat/start", h.StartConversation)
}

// ------------------------------------------------------------
// DTOs
// ------------------------------------------------------------
type createConversationReq struct {
	UserA string `json:"user_a"`
	UserB string `json:"user_b"`
}

type sendMessageReq struct {
	ConversationID string `json:"conversation_id"`
	SenderID       string `json:"sender_id"`
	RecipientID    string `json:"recipient_id"`
	Message        string `json:"message"`
	MessageType    string `json:"message_type"` // "user_text" or "system"
}

//
// ------------------------------------------------------------
// HANDLERS
// ------------------------------------------------------------
//

// CreateConversation → POST /chat/conversation
func (h *ChatHandler) CreateConversation(w http.ResponseWriter, r *http.Request) {
	var req createConversationReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json body", http.StatusBadRequest)
		return
	}

	conv, err := h.chatSvc.GetOrCreateConversation(r.Context(), req.UserA, req.UserB)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, conv)
}

// SendMessage → POST /chat/message
func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	var req sendMessageReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json body", http.StatusBadRequest)
		return
	}

	var msg interface{}
	var err error

	if req.MessageType == "system" {
		msg, err = h.chatSvc.SendSystemMessage(r.Context(), req.ConversationID, req.SenderID, req.Message)
	} else {
		msg, err = h.chatSvc.SendUserMessage(r.Context(), req.ConversationID, req.SenderID, req.RecipientID, req.Message)
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	writeJSON(w, http.StatusOK, msg)
}

// ListUserConversations → GET /chat/conversations?user_id=&limit=&offset=
func (h *ChatHandler) ListUserConversations(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))

	if limit == 0 {
		limit = 20
	}

	convs, err := h.chatSvc.ListUserConversations(r.Context(), userID, limit, offset)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, convs)
}

// GetMessages → GET /chat/messages/{conversationID}?limit=&offset=
func (h *ChatHandler) GetMessages(w http.ResponseWriter, r *http.Request) {
	conversationID := chi.URLParam(r, "conversationID")

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))

	if limit == 0 {
		limit = 50
	}

	msgs, err := h.chatSvc.ListMessages(r.Context(), conversationID, limit, offset)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, msgs)
}

// ------------------------------------------------------------
// Utility: writeJSON()
// ------------------------------------------------------------
func writeJSON(w http.ResponseWriter, code int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data)
}

func (h *ChatHandler) StartConversation(w http.ResponseWriter, r *http.Request) {
	var req startConversationReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid json body", http.StatusBadRequest)
		return
	}
	if req.SenderID == "" || req.ReceiverID == "" || req.Message == "" {
		http.Error(w, "sender_id, receiver_id and message are required", http.StatusBadRequest)
		return
	}

	conv, msg, err := h.chatSvc.StartConversationWithMessage(r.Context(), req.SenderID, req.ReceiverID, req.Message, req.MessageType)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusOK, startConversationResp{
		Conversation: conv,
		Message:      msg,
	})
}
