package ws

import "time"

// Incoming/outgoing WS message format
type WSMessage struct {
	Event string      `json:"event"` // "message", "typing", "read", "presence"
	Data  interface{} `json:"data"`
}

// Message payload when event == "message"
type MessagePayload struct {
	ID             string    `json:"id,omitempty"` // message UUID (server assigned)
	ConversationID string    `json:"conversation_id"`
	SenderID       string    `json:"sender_id"`
	RecipientID    string    `json:"recipient_id"`
	MessageType    string    `json:"message_type"` // "user_text", "image", etc
	Ciphertext     string    `json:"ciphertext"`
	EncryptionMeta string    `json:"encryption_meta,omitempty"`
	Status         string    `json:"status,omitempty"` // "sent"|"delivered"|"read"
	CreatedAt      time.Time `json:"created_at,omitempty"`
}
