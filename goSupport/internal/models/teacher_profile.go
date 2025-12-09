package models

// type TeacherProfile struct {
// 	ID        uint      `gorm:"primaryKey" json:"id"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"updated_at"`

// 	Bio                string `json:"bio"`
// 	Tags               string `json:"tags"`
// 	Name               string `json:"name"`
// 	Designation        string `json:"designation"`
// 	ProfilePictureLink string `json:"profile_picture_link"`

// 	IsTopTutor bool    `json:"is_top_tutor"`
// 	Rating     float32 `gorm:"type:numeric(2,1)" json:"rating"`
// 	Courses    int     `json:"courses"`
// 	Students   int     `json:"students"`
// 	Sessions   int     `json:"sessions"`

// 	UserID uint `json:"user_id"`
// }

type CourseInfo struct {
	ID           uint   `json:"id"`
	Title        string `json:"title"`
	TotalLessons int64  `json:"total_lessons"`
}

type TeacherProfile struct {
	ID           uint         `json:"id"`
	Name         string       `json:"name"`
	Designation  string       `json:"designation"`
	Bio          string       `json:"bio"`
	LongBio      string       `json:"long_bio"`
	Tags         string       `json:"tags"`
	ProfilePic   string       `json:"profile_picture_link" gorm:"column:profile_picture_link"`
	IsTopTutor   bool         `json:"is_top_tutor"`
	Rating       float64      `json:"rating"`
	CoursesCount int64        `json:"courses"`
	Students     int64        `json:"students"`
	Sessions     int64        `json:"sessions"`
	Courses      []CourseInfo `json:"courses_info" gorm:"-"`
	TotalLessons int64        `json:"total_lessons" gorm:"-"`
}
