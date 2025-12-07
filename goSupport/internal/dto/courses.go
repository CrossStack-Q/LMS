package dto

import "time"

type LessonContentDTO struct {
	ID         int64       `json:"id"`
	Type       string      `json:"type"`
	Value      interface{} `json:"value"`
	OrderIndex int         `json:"order_index"`
}

type LessonDTO struct {
	ID         int64              `json:"id"`
	Title      string             `json:"title"`
	Type       string             `json:"lesson_type"`
	VideoURL   string             `json:"video_url"`
	Duration   int64              `json:"duration_sec"`
	OrderIndex int                `json:"order_index"`
	Contents   []LessonContentDTO `json:"contents"`
}

type SectionDTO struct {
	ID      int64       `json:"id"`
	Title   string      `json:"title"`
	Desc    string      `json:"description"`
	Order   int64       `json:"order_index"`
	Lessons []LessonDTO `json:"lessons"`
}

type CourseDetailsDTO struct {
	LongDesc       string      `json:"long_desc"`
	Goals          interface{} `json:"goals"`
	Requirements   interface{} `json:"requirements"`
	TargetAudience interface{} `json:"target_audience"`
	PreviewVideo   string      `json:"preview_video"`
	TotalHours     float64     `json:"total_hours"`
	TotalLessons   int64       `json:"total_lessons"`
	TotalSections  int64       `json:"total_sections"`
}

type CourseDTO struct {
	ID        int64            `json:"id"`
	Title     string           `json:"title"`
	Desc      string           `json:"description"`
	Cover     string           `json:"cover_image"`
	TeacherID int64            `json:"teacher_id"`
	ShortDesc string           `json:"short_desc"`
	Category  string           `json:"category"`
	Level     string           `json:"level"`
	Price     float64          `json:"price"`
	IsFree    bool             `json:"is_free"`
	Details   CourseDetailsDTO `json:"details"`
	Sections  []SectionDTO     `json:"sections"`
}

type CourseSummaryDTO struct {
	ID        int64  `json:"id"`
	Title     string `json:"title"`
	Cover     string `json:"cover_image"`
	ShortDesc string `json:"short_desc"`
	Category  string `json:"category"`
	// Rating    float64 `json:"rating"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Description string    `json:"description"`
	TeacherID   int64     `json:"teacher_id"`
	Level       string    `json:"level"`
	Price       float64   `json:"price"`
	IS_Free     bool      `json:"is_free"`
}
