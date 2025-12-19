package dto

import (
	"time"

	"github.com/google/uuid"
)

type BlogListDTO struct {
	ID        uuid.UUID `json:"id"`
	Title     string    `json:"title"`
	Author    string    `json:"author"`
	ShortDesc string    `json:"short_desc"`
	Image     string    `json:"image"`
	Likes     int       `json:"likes"`
	CreatedAt time.Time `json:"created_at"`
}
