package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseDSN string
}

func LoadConfig() (*Config, error) {
	godotenv.Load()

	return &Config{
		DatabaseDSN: os.Getenv("DATABASE_DSN"),
	}, nil
}
