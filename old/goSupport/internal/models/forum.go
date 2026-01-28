package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Forum struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Title        string
	Body         string
	AuthorName   string
	AuthorAvatar string
	Tags         pq.StringArray `gorm:"type:text[]"`
	Views        int
	Comments     int
	Likes        int
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
