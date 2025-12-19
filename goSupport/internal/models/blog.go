package models

import (
	"time"

	"github.com/google/uuid"
)

type Blog struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Title     string    `gorm:"type:varchar(255);not null"`
	Author    string    `gorm:"type:varchar(150);not null"`
	ShortDesc string    `gorm:"type:text"`
	Content   string    `gorm:"type:text;not null"`
	Image     string    `gorm:"type:text"`
	Likes     int       `gorm:"default:0"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
