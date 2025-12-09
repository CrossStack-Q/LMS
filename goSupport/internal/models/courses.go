package models

import "time"

type Course struct {
	ID          int64 `gorm:"primaryKey"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Title       string
	Description string
	CoverImage  string
	TeacherID   int64
	ShortDesc   string
	Category    string
	Level       string
	Price       float64
	IsFree      bool
}

type CourseDetails struct {
	ID             int64
	CourseID       int64
	LongDesc       string
	Goals          interface{} `gorm:"type:jsonb"`
	Requirements   interface{} `gorm:"type:jsonb"`
	TargetAudience interface{} `gorm:"type:jsonb"`
	PreviewVideo   string
	TotalHours     float64
	TotalLessons   int64
	TotalSections  int64
}

type Section struct {
	ID          int64 `gorm:"primaryKey"`
	CourseID    int64
	Title       string
	Description string
	OrderIndex  int64
}

type Lesson struct {
	ID          int64 `gorm:"primaryKey"`
	CourseID    int64
	SectionID   int64
	Title       string
	LessonType  string
	VideoURL    string
	DurationSec int64
	OrderIndex  int64
}

type LessonContent struct {
	ID         int64 `gorm:"primaryKey"`
	LessonID   int64
	Type       string      `gorm:"column:content_type"`
	Value      interface{} `gorm:"column:value;type:jsonb"`
	OrderIndex int64
}

type Category struct {
	ID          int64     `gorm:"primaryKey" json:"id"`
	Name        string    `json:"name"`
	CourseCount int64     `gorm:"column:course_count" json:"course_count"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CourseCategory struct {
	ID         int64 `gorm:"primaryKey" json:"id"`
	CourseID   int64 `json:"course_id"`
	CategoryID int64 `json:"category_id"`
}
