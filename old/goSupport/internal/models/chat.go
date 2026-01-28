package models

import "time"

type Conversation struct {
	ID        string    `gorm:"type:uuid;primaryKey" json:"id"`
	UserA     string    `gorm:"type:uuid;not null" json:"user_a"`
	UserB     string    `gorm:"type:uuid;not null" json:"user_b"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Message struct {
	ID             string                 `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	ConversationID string                 `gorm:"type:uuid;index;not null" json:"conversation_id"`
	SenderID       string                 `gorm:"type:uuid;not null" json:"sender_id"`
	RecipientID    string                 `gorm:"type:uuid;not null" json:"recipient_id"`
	MessageType    string                 `gorm:"type:text;default:'user_text'" json:"message_type"` // user_text, system_alert, etc.
	Ciphertext     string                 `gorm:"type:text;not null" json:"ciphertext"`
	EncryptionMeta map[string]interface{} `gorm:"type:jsonb" json:"encryption_meta"`
	Status         string                 `gorm:"type:text;default:'sent'" json:"status"`
	CreatedAt      time.Time              `json:"created_at"`
	DeliveredAt    *time.Time             `json:"delivered_at,omitempty"`
	ReadAt         *time.Time             `json:"read_at,omitempty"`
}

type Attachment struct {
	ID          string    `gorm:"type:uuid;primaryKey" json:"id"`
	MessageID   string    `gorm:"type:uuid;index;not null" json:"message_id"`
	ObjectKey   string    `gorm:"type:text;not null" json:"object_key"`
	FileName    string    `gorm:"type:text" json:"file_name"`
	ContentType string    `gorm:"type:text" json:"content_type"`
	Size        int64     `json:"size"`
	CreatedAt   time.Time `json:"created_at"`
}

type ConversationUser struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	ImageURL string `json:"image_url"`
}

type ConversationResponse struct {
	ID        string           `json:"id"`
	UserA     ConversationUser `json:"user_a"`
	UserB     ConversationUser `json:"user_b"`
	CreatedAt string           `json:"created_at"`
	UpdatedAt string           `json:"updated_at"`
}
