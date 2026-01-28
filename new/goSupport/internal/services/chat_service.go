package services

import (
	"context"
	"errors"
	"time"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	ErrConversationNotFound = errors.New("conversation not found")
	ErrNotMember            = errors.New("user is not part of this conversation")
)

type ChatService struct {
	chatRepo repositories.ChatRepository
	userRepo repositories.UserRepository
}

func NewChatService(
	chatRepo repositories.ChatRepository,
	userRepo repositories.UserRepository,
) *ChatService {
	return &ChatService{
		chatRepo: chatRepo,
		userRepo: userRepo,
	}
}

//
// ------------------------------------------------------------
// Conversation Handling
// ------------------------------------------------------------
//

// CreateConversation ensures there is only ONE conversation between two users.
func (s *ChatService) CreateConversation(ctx context.Context, userA, userB string) (*models.Conversation, error) {

	// Enforce stable ordering to avoid duplicates
	if userA > userB {
		userA, userB = userB, userA
	}

	conv := &models.Conversation{
		ID:    uuid.NewString(),
		UserA: userA,
		UserB: userB,
	}

	return s.chatRepo.CreateConversation(ctx, conv)
}

// GetOrCreateConversation returns the existing conversation or creates a new one.
func (s *ChatService) GetOrCreateConversation(ctx context.Context, userA, userB string) (*models.Conversation, error) {
	return s.CreateConversation(ctx, userA, userB)
}

//
// ------------------------------------------------------------
// Messaging Logic
// ------------------------------------------------------------
//

// Validate that sender belongs to conversation
func (s *ChatService) validateMembership(conv *models.Conversation, userID string) error {
	if conv.UserA != userID && conv.UserB != userID {
		return ErrNotMember
	}
	return nil
}

// SendUserMessage sends a normal user-to-user message.
func (s *ChatService) SendUserMessage(ctx context.Context, conversationID, senderID, recipientID, message string) (*models.Message, error) {

	// fetch conversation
	conv, err := s.chatRepo.GetConversationByID(ctx, conversationID)
	if err != nil {
		return nil, ErrConversationNotFound
	}

	// check if sender belongs to conversation
	if err := s.validateMembership(conv, senderID); err != nil {
		return nil, err
	}

	msg := &models.Message{
		ID:             uuid.NewString(),
		ConversationID: conversationID,
		SenderID:       senderID,
		RecipientID:    recipientID,
		MessageType:    "user_text",
		Ciphertext:     message, // plaintext for now — encryption added later
		CreatedAt:      time.Now(),
		Status:         "sent",
	}

	return s.chatRepo.CreateMessage(ctx, msg)
}

// SendSystemMessage sends a system-generated message (meeting alert, etc.)
func (s *ChatService) SendSystemMessage(ctx context.Context, conversationID string, senderID string, content string) (*models.Message, error) {

	conv, err := s.chatRepo.GetConversationByID(ctx, conversationID)
	if err != nil {
		return nil, ErrConversationNotFound
	}

	// For system messages, sender must be admin/teacher/backend
	// Still ensure they are part of conversation OR allow special privileged flow.
	// Here we simply allow any system context (senderID  = "system")
	if senderID != "system" {
		if err := s.validateMembership(conv, senderID); err != nil {
			return nil, err
		}
	}

	// deliver to both participants
	// recA := conv.UserA
	// recB := conv.UserB

	// system messages typically broadcast to both
	msg := &models.Message{
		ID:             uuid.NewString(),
		ConversationID: conv.ID,
		SenderID:       "system",
		RecipientID:    "", // client handles both; or create per-user messages
		MessageType:    "system_alert",
		Ciphertext:     content, // plaintext for now
		CreatedAt:      time.Now(),
		Status:         "sent",
	}

	// One message entry stored; clients render it for both sides.
	// If you want per-recipient messages, you can duplicate this.
	return s.chatRepo.CreateMessage(ctx, msg)
}

//
// ------------------------------------------------------------
// Fetching Conversations + Messages
// ------------------------------------------------------------
//

// ListUserConversations
func (s *ChatService) ListUserConversations(ctx context.Context, userID string, limit, offset int) ([]models.ConversationResponse, error) {
	convs, err := s.chatRepo.GetUserConversations(ctx, userID, limit, offset)
	if err != nil {
		return nil, err
	}

	var result []models.ConversationResponse

	for _, c := range convs {
		// fetch user_a
		ua, err := s.userRepo.GetByID(ctx, c.UserA)
		if err != nil || ua == nil {
			continue
		}

		// fetch user_b
		ub, err := s.userRepo.GetByID(ctx, c.UserB)
		if err != nil || ub == nil {
			continue
		}

		result = append(result, models.ConversationResponse{
			ID: c.ID,
			UserA: models.ConversationUser{
				ID:       ua.ID,
				Name:     ua.Name,
				ImageURL: ua.ImageURL,
			},
			UserB: models.ConversationUser{
				ID:       ub.ID,
				Name:     ub.Name,
				ImageURL: ub.ImageURL,
			},
			CreatedAt: c.CreatedAt.Format(time.RFC3339),
			UpdatedAt: c.UpdatedAt.Format(time.RFC3339),
		})
	}

	return result, nil
}

// ListMessages returns paginated message history
func (s *ChatService) ListMessages(ctx context.Context, conversationID string, limit, offset int) ([]models.Message, error) {
	return s.chatRepo.ListMessagesByConversation(ctx, conversationID, limit, offset)
}

// -----New Chat chalate Raho ---v. -c

func (s *ChatService) StartConversationWithMessage(
	ctx context.Context,
	senderID, receiverID, message, messageType string,
) (*models.Conversation, *models.Message, error) {

	if senderID == "" || receiverID == "" {
		return nil, nil, errors.New("sender_id and receiver_id required")
	}

	// Step 1: Normalize ordering to avoid duplicate conversations
	userA := senderID
	userB := receiverID
	if userA > userB {
		userA, userB = userB, userA
	}

	// Step 2: Check if conversation already exists
	existingConv, err := s.chatRepo.GetConversationByUsers(ctx, userA, userB)
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, nil, err
	}

	var conv *models.Conversation

	if existingConv != nil {
		// Use the old conversation
		conv = existingConv
	} else {
		// Create a new conversation
		newConv := &models.Conversation{
			ID:    uuid.NewString(),
			UserA: userA,
			UserB: userB,
		}

		conv, err = s.chatRepo.CreateConversation(ctx, newConv)
		if err != nil {
			return nil, nil, err
		}
	}

	// Step 3: Create message
	if messageType == "" {
		messageType = "user_text"
	}

	msg := &models.Message{
		ID:             uuid.NewString(),
		ConversationID: conv.ID,
		SenderID:       senderID,
		RecipientID:    receiverID,
		MessageType:    messageType,
		Ciphertext:     message,
		CreatedAt:      time.Now(),
		Status:         "sent",
	}

	createdMsg, err := s.chatRepo.CreateMessage(ctx, msg)
	if err != nil {
		return conv, nil, err
	}

	return conv, createdMsg, nil
}
