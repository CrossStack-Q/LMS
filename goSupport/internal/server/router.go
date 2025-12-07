package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/CrossStack-Q/LMS/goSupport/internal/handlers"
	middlewares "github.com/CrossStack-Q/LMS/goSupport/internal/middleware"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
	"github.com/CrossStack-Q/LMS/goSupport/internal/services"

	"gorm.io/gorm"
)

func NewRouterServer(db *gorm.DB, addr string) *http.Server {
	r := chi.NewRouter()

	// ------------------------------------------------------------
	// GLOBAL MIDDLEWARE
	// ------------------------------------------------------------
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.AllowContentType("application/json"))
	r.Use(middleware.CleanPath)
	r.Use(middlewares.CorsMiddleware)
	// r.Use(middleware.cor)

	// HEALTH CHECK
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// ------------------------------------------------------------
	// REPOSITORIES
	// ------------------------------------------------------------
	userRepo := repositories.NewUserRepository(db)
	courseRepo := repositories.NewCourseRepository(db)
	teacherRepo := repositories.NewTeacherRepository(db)
	chatRepo := repositories.NewChatRepository(db)
	// SQL query with postgres
	// teacherRepo := repositories.NewTeacherRepository(db) // later

	// ------------------------------------------------------------
	// SERVICES
	// ------------------------------------------------------------
	userSvc := services.NewUserService(userRepo)
	courseSvc := services.NewCourseService(courseRepo)
	teacherService := services.NewTeacherService(teacherRepo)
	chatService := services.NewChatService(*chatRepo, userRepo)

	// ------------------------------------------------------------
	// HANDLERS
	// ------------------------------------------------------------
	userHandler := handlers.NewUserHandler(userSvc)
	courseHandler := handlers.NewCourseHandler(courseSvc)
	teacherHandler := handlers.NewTeacherHandler(teacherService)
	chatHandler := handlers.NewChatHandler(chatService)

	// ------------------------------------------------------------
	// API ROUTES → version v1
	// ------------------------------------------------------------
	r.Route("/api/v1", func(api chi.Router) {

		// user auth
		userHandler.RegisterRoutes(api)

		// courses + sections + lessons
		courseHandler.RegisterRoutes(api)

		// Teachers ke logic yaha hain abhi single function par filter se single or all handle ho rahe hain . Need for Seperate API ??

		teacherHandler.RegisterRoutes(api)

		// Chat Ka Pata Nahi

		chatHandler.RegisterRoutes(api)

		// teacherHandler.RegisterRoutes(api)  // later
		// chatHandler.RegisterRoutes(api)      // later
		// playlistHandler.RegisterRoutes(api)  // later
	})

	// ------------------------------------------------------------
	// RETURN HTTP SERVER
	// ------------------------------------------------------------
	return &http.Server{
		Addr:    addr,
		Handler: r,
	}
}
