package server

import (
	"context"
	"net/http"
	"time"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"

	"github.com/CrossStack-Q/LMS/goSupport/internal/handlers"
	middlewares "github.com/CrossStack-Q/LMS/goSupport/internal/middleware"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/CrossStack-Q/LMS/goSupport/internal/ws"

	"gorm.io/gorm"
)

func NewRouterServer(db *gorm.DB, addr string) *http.Server {
	r := chi.NewRouter()

	r.Use(middlewares.CorsMiddleware)
	r.Use(middleware.Logger)

	hub := ws.NewHub()
	go hub.Run()

	wsHandler := ws.NewWSHandler(hub)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	userRepo := repositories.NewUserRepository(db)
	courseRepo := repositories.NewCourseRepository(db)
	categoryRepo := repositories.NewCategoryRepository(db)
	courseCategoryRepo := repositories.NewCourseCategoryRepository(db)
	teacherRepo := repositories.NewTeacherRepository(db)
	chatRepo := repositories.NewChatRepository(db)
	blogsRepo := repositories.NewBlogRepository(db)
	forumsRepo := repositories.NewForumRepository(db)

	wsHandler.SaveMessage = func(ctx context.Context, msg *ws.MessagePayload) error {
		m := &models.Message{
			ID:             msg.ID,
			ConversationID: msg.ConversationID,
			SenderID:       msg.SenderID,
			RecipientID:    msg.RecipientID,
			MessageType:    msg.MessageType,
			Ciphertext:     msg.Ciphertext,
			Status:         msg.Status,
			CreatedAt:      msg.CreatedAt,
		}
		_, err := chatRepo.CreateMessage(ctx, m)
		return err
	}

	wsHandler.MarkMessageDelivered = func(ctx context.Context, id string, t time.Time) error {
		return chatRepo.MarkMessageDelivered(ctx, id, t)
	}
	wsHandler.MarkMessageRead = func(ctx context.Context, id string, t time.Time) error {
		return chatRepo.MarkMessageRead(ctx, id, t)
	}

	userSvc := services.NewUserService(userRepo)
	courseSvc := services.NewCourseService(courseRepo)
	categorySvc := services.NewCategoryService(categoryRepo, courseCategoryRepo)
	teacherSvc := services.NewTeacherService(teacherRepo)
	chatSvc := services.NewChatService(*chatRepo, userRepo)
	blogSvc := services.NewBlogService(blogsRepo)
	forumSvc := services.NewForumService(forumsRepo)

	userHandler := handlers.NewUserHandler(userSvc)
	courseHandler := handlers.NewCourseHandler(courseSvc)
	categoryHandler := handlers.NewCategoryHandler(categorySvc)
	teacherHandler := handlers.NewTeacherHandler(teacherSvc)
	chatHandler := handlers.NewChatHandler(chatSvc)
	blogHandler := handlers.NewBlogHandler(blogSvc)
	forumHandler := handlers.NewForumHandler(forumSvc)

	r.Route("/api/v1", func(api chi.Router) {
		api.Get("/chat/ws", wsHandler.ServeWS)

		userHandler.RegisterRoutes(api)
		courseHandler.RegisterRoutes(api)
		categoryHandler.RegisterRoutes(api)
		teacherHandler.RegisterRoutes(api)
		blogHandler.RegisterRoutes(api)
		forumHandler.RegisterRoutes(api)

		api.Route("/chat", func(chat chi.Router) {
			chat.Use(middlewares.VerifyJWTFromHeader)
			chat.Get("/conversations", chatHandler.ListUserConversations)
			chat.Get("/messages/{conversationID}", chatHandler.GetMessages)
			chat.Post("/message", chatHandler.SendMessage)
			chat.Post("/start", chatHandler.StartConversation)
		})
	})

	return &http.Server{
		Addr:    addr,
		Handler: r,
	}
}
