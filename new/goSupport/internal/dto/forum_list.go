package dto

import (
	"time"

	"github.com/google/uuid"
)

type ForumListDTO struct {
	ID        uuid.UUID `json:"id"`
	Author    string    `json:"author"`
	Avatar    string    `json:"avatar"`
	Title     string    `json:"title"`
	Body      string    `json:"body"`
	Tags      []string  `json:"tags"`
	Views     int       `json:"views"`
	Comments  int       `json:"comments"`
	Likes     int       `json:"likes"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type TagCountDTO struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
}

type PaginationDTO struct {
	Page       int `json:"page"`
	PageSize   int `json:"page_size"`
	TotalItems int `json:"total_items"`
	TotalPages int `json:"total_pages"`
}

type ForumListResponseDTO struct {
	Data       []ForumListDTO `json:"data"`
	Pagination PaginationDTO  `json:"pagination"`
}
