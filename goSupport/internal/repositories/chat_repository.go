// File: internal/repositories/chat_repository.go
package repositories

import (
	"context"
	"time"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"gorm.io/gorm"
)

type ChatRepository struct {
	DB *gorm.DB
}

func NewChatRepository(db *gorm.DB) *ChatRepository {
	return &ChatRepository{DB: db}
}

// CreateConversation ensures the conversation exists between two users and returns it.
// It keeps an invariant (user_a < user_b) to avoid duplicates.
func (r *ChatRepository) CreateConversation(ctx context.Context, conv *models.Conversation) (*models.Conversation, error) {
	conv.UpdatedAt = time.Now()
	conv.CreatedAt = time.Now()

	// ensure deterministic ordering so uniqueness (user_a, user_b) holds irrespective of caller order
	// caller should ensure this; repository will attempt to create unique row and return existing if duplicate
	err := r.DB.WithContext(ctx).Where("user_a = ? AND user_b = ?", conv.UserA, conv.UserB).FirstOrCreate(conv).Error
	if err != nil {
		return nil, err
	}
	return conv, nil
}

func (r *ChatRepository) GetConversationByID(ctx context.Context, id string) (*models.Conversation, error) {
	var conv models.Conversation
	if err := r.DB.WithContext(ctx).First(&conv, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &conv, nil
}

func (r *ChatRepository) GetUserConversations(ctx context.Context, userID string, limit, offset int) ([]models.Conversation, error) {
	var convs []models.Conversation
	err := r.DB.WithContext(ctx).
		Where("user_a = ? OR user_b = ?", userID, userID).
		Order("updated_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&convs).Error
	return convs, err
}

func (r *ChatRepository) CreateMessage(ctx context.Context, msg *models.Message) (*models.Message, error) {
	now := time.Now()
	msg.CreatedAt = now
	if err := r.DB.WithContext(ctx).Create(msg).Error; err != nil {
		return nil, err
	}
	// Update conversation updated_at
	_ = r.DB.WithContext(ctx).Model(&models.Conversation{}).
		Where("id = ?", msg.ConversationID).
		Update("updated_at", now).Error

	return msg, nil
}

func (r *ChatRepository) ListMessagesByConversation(ctx context.Context, conversationID string, limit, offset int) ([]models.Message, error) {
	var msgs []models.Message
	err := r.DB.WithContext(ctx).
		Where("conversation_id = ?", conversationID).
		Order("created_at ASC").
		Limit(limit).
		Offset(offset).
		Find(&msgs).Error
	return msgs, err
}

func (r *ChatRepository) MarkMessageDelivered(ctx context.Context, messageID string, deliveredAt time.Time) error {
	return r.DB.WithContext(ctx).Model(&models.Message{}).
		Where("id = ?", messageID).
		Updates(map[string]interface{}{"status": "delivered", "delivered_at": deliveredAt}).Error
}

func (r *ChatRepository) MarkMessageRead(ctx context.Context, messageID string, readAt time.Time) error {
	return r.DB.WithContext(ctx).Model(&models.Message{}).
		Where("id = ?", messageID).
		Updates(map[string]interface{}{"status": "read", "read_at": readAt}).Error
}

func (r *ChatRepository) GetConversationByUsers(ctx context.Context, userA, userB string) (*models.Conversation, error) {
	var conv models.Conversation
	err := r.DB.WithContext(ctx).
		Where("user_a = ? AND user_b = ?", userA, userB).
		First(&conv).Error

	if err != nil {
		return nil, err
	}
	return &conv, nil
}
