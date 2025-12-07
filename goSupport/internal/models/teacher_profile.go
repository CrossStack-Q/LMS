package models

import "time"

type TeacherProfile struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Bio                string `json:"bio"`
	Tags               string `json:"tags"`
	Name               string `json:"name"`
	Designation        string `json:"designation"`
	ProfilePictureLink string `json:"profile_picture_link"`

	IsTopTutor bool    `json:"is_top_tutor"`
	Rating     float32 `gorm:"type:numeric(2,1)" json:"rating"`
	Courses    int     `json:"courses"`
	Students   int     `json:"students"`
	Sessions   int     `json:"sessions"`

	UserID uint `json:"user_id"`
}
