package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/config"
	"github.com/CrossStack-Q/LMS/goSupport/internal/database"
	"github.com/CrossStack-Q/LMS/goSupport/internal/server"
)

func main() {
	// load config
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Config Load error")
	}

	// if err := database.RunMigrations(cfg.DatabaseDSN, "./migrations"); err != nil {
	// 	log.Fatalf("❌ Migration failed: %v", err)
	// }
	// log.Println("✅ Migrations applied")

	// connect DB (GORM)
	db, err := database.ConnectDB(cfg.DatabaseDSN)
	if err != nil {
		log.Fatal("❌ Failed to connect DB:", err)
	}

	// create router server (pass db and address)
	addr := ":8080"
	srv := server.NewRouterServer(db, addr)

	// start server in background
	go func() {
		log.Println("🚀 SkillZone API running on", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen:%+s\n", err)
		}
	}()

	// graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}
	log.Println("Server exiting")
}
