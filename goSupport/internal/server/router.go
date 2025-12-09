// package server

// import (
// 	"context"
// 	"net/http"
// 	"time"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/go-chi/chi/v5/middleware"

// 	"github.com/CrossStack-Q/LMS/goSupport/internal/handlers"
// 	middlewares "github.com/CrossStack-Q/LMS/goSupport/internal/middleware"
// 	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
// 	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
// 	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
// 	"github.com/CrossStack-Q/LMS/goSupport/internal/ws"

// 	"gorm.io/gorm"
// )

// func NewRouterServer(db *gorm.DB, addr string) *http.Server {
// 	r := chi.NewRouter()

// 	// ------------------------------------------------------------
// 	// GLOBAL MIDDLEWARE
// 	// ------------------------------------------------------------
// 	r.Use(middleware.Logger)
// 	r.Use(middleware.Recoverer)
// 	r.Use(middleware.AllowContentType("application/json"))
// 	r.Use(middleware.CleanPath)
// 	r.Use(middlewares.CorsMiddleware)
// 	// r.Use(middleware.cor)

// 	hub := ws.NewHub()
// 	go hub.Run()

// 	wsHandler := ws.NewWSHandler(hub)

// 	// HEALTH CHECK
// 	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
// 		w.Write([]byte("OK"))
// 	})

// 	// ------------------------------------------------------------
// 	// REPOSITORIES
// 	// ------------------------------------------------------------
// 	userRepo := repositories.NewUserRepository(db)
// 	courseRepo := repositories.NewCourseRepository(db)
// 	categoryRepo := repositories.NewCategoryRepository(db)
// 	courseCategoryRepo := repositories.NewCourseCategoryRepository(db)
// 	teacherRepo := repositories.NewTeacherRepository(db)
// 	chatRepo := repositories.NewChatRepository(db)
// 	// SQL query with postgres
// 	// teacherRepo := repositories.NewTeacherRepository(db) // later

// 	// WS WS
// 	wsHandler.SaveMessage = func(ctx context.Context, msg *ws.MessagePayload) error {
// 		// Construct a models.Message using the server-generated ID in the payload (if present)
// 		m := &models.Message{
// 			ID:             msg.ID,
// 			ConversationID: msg.ConversationID,
// 			SenderID:       msg.SenderID,
// 			RecipientID:    msg.RecipientID,
// 			MessageType:    msg.MessageType,
// 			Ciphertext:     msg.Ciphertext,
// 			Status:         msg.Status,
// 			CreatedAt:      msg.CreatedAt,
// 		}
// 		_, err := chatRepo.CreateMessage(ctx, m)
// 		return err
// 	}

// 	// ------------------------------------------------------------
// 	// SERVICES
// 	// ------------------------------------------------------------
// 	userSvc := services.NewUserService(userRepo)
// 	courseSvc := services.NewCourseService(courseRepo)
// 	categorySvc := services.NewCategoryService(categoryRepo, courseCategoryRepo)
// 	teacherService := services.NewTeacherService(teacherRepo)
// 	chatService := services.NewChatService(*chatRepo, userRepo)

// 	// ------------------------------------------------------------
// 	// HANDLERS
// 	// ------------------------------------------------------------
// 	userHandler := handlers.NewUserHandler(userSvc)
// 	courseHandler := handlers.NewCourseHandler(courseSvc)
// 	categoryHandler := handlers.NewCategoryHandler(categorySvc)
// 	teacherHandler := handlers.NewTeacherHandler(teacherService)
// 	chatHandler := handlers.NewChatHandler(chatService)

// 	wsHandler.MarkMessageDelivered = func(ctx context.Context, messageID string, deliveredAt time.Time) error {
// 		return chatRepo.MarkMessageDelivered(ctx, messageID, deliveredAt)
// 	}
// 	wsHandler.MarkMessageRead = func(ctx context.Context, messageID string, readAt time.Time) error {
// 		return chatRepo.MarkMessageRead(ctx, messageID, readAt)
// 	}

// 	// ------------------------------------------------------------
// 	// API ROUTES → version v1
// 	// ------------------------------------------------------------
// 	r.Route("/api/v1", func(api chi.Router) {

// 		// ws ws

// 		api.Get("/chat/ws", wsHandler.ServeWS)

// 		api.Route("/chat", func(chat chi.Router) {
// 			chat.Use(middlewares.VerifyJWTFromHeader)
// 			// now register chat handler routes but without the /chat prefix inside handler.RegisterRoutes
// 		})
// 		api.With(middlewares.VerifyJWTFromHeader).Get("/chat/conversations", chatHandler.ListUserConversations)

// 		// user auth
// 		userHandler.RegisterRoutes(api)

// 		// courses + sections + lessons
// 		courseHandler.RegisterRoutes(api)
// 		// category courses
// 		categoryHandler.RegisterRoutes(api)

// 		// Teachers ke logic yaha hain abhi single function par filter se single or all handle ho rahe hain . Need for Seperate API ??

// 		teacherHandler.RegisterRoutes(api)

// 		// Chat Ka Pata Nahi

// 		chatHandler.RegisterRoutes(api)

// 		// ws

// 		// teacherHandler.RegisterRoutes(api)  // later
// 		// chatHandler.RegisterRoutes(api)      // later
// 		// playlistHandler.RegisterRoutes(api)  // later
// 	})

// 	// ------------------------------------------------------------
// 	// RETURN HTTP SERVER
// 	// ------------------------------------------------------------
// 	return &http.Server{
// 		Addr:    addr,
// 		Handler: r,
// 	}
// }

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

	userHandler := handlers.NewUserHandler(userSvc)
	courseHandler := handlers.NewCourseHandler(courseSvc)
	categoryHandler := handlers.NewCategoryHandler(categorySvc)
	teacherHandler := handlers.NewTeacherHandler(teacherSvc)
	chatHandler := handlers.NewChatHandler(chatSvc)

	r.Route("/api/v1", func(api chi.Router) {
		api.Get("/chat/ws", wsHandler.ServeWS)

		userHandler.RegisterRoutes(api)
		courseHandler.RegisterRoutes(api)
		categoryHandler.RegisterRoutes(api)
		teacherHandler.RegisterRoutes(api)

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
