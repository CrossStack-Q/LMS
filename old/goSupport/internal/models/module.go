package models

import "time"

type Module struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	CourseID uint   `json:"course_id"` // FK → Course
	Title    string `json:"title"`
	Order    int    `json:"order_number"`
}
