package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"gorm.io/gorm"
)

type TeacherRepo struct {
	db *gorm.DB
}

func NewTeacherRepository(db *gorm.DB) TeacherRepository {
	return &TeacherRepo{db: db}
}

// func (r *TeacherRepo) GetTeachers(ctx context.Context, id string, designation string) ([]models.TeacherProfile, error) {
// 	var teachers []models.TeacherProfile
// 	query := r.db.WithContext(ctx).Model(&models.TeacherProfile{})

// 	if id != "" {
// 		query = query.Where("id = ?", id)
// 	}

// 	if designation != "" {
// 		query = query.Where("designation ILIKE ?", "%"+designation+"%")
// 	}

// 	err := query.Find(&teachers).Error
// 	if err != nil {
// 		return nil, err
// 	}

// 	return teachers, nil
// }

func (r *TeacherRepo) GetTeachers(ctx context.Context, id string, designation string) ([]models.TeacherProfile, error) {
	var teachers []models.TeacherProfile
	query := r.db.WithContext(ctx).Model(&models.TeacherProfile{})

	if id != "" {
		query = query.Where("id = ?", id)
	}
	if designation != "" {
		query = query.Where("designation ILIKE ?", "%"+designation+"%")
	}

	// Fetch basic teacher info first
	if err := query.Find(&teachers).Error; err != nil {
		return nil, err
	}

	// For each teacher, fetch courses and total lessons
	for i := range teachers {
		var courses []models.CourseInfo
		var totalLessons int64

		// Join courses and count lessons
		err := r.db.WithContext(ctx).
			Table("courses").
			Select("courses.id, courses.title, COUNT(lessons.id) as total_lessons").
			Joins("LEFT JOIN sections ON sections.course_id = courses.id").
			Joins("LEFT JOIN lessons ON lessons.section_id = sections.id").
			Where("courses.teacher_id = ?", teachers[i].ID).
			Group("courses.id").
			Scan(&courses).Error
		if err != nil {
			return nil, err
		}

		// Calculate total lessons across all courses
		for _, c := range courses {
			totalLessons += c.TotalLessons
		}

		teachers[i].Courses = courses
		teachers[i].TotalLessons = totalLessons
		teachers[i].CoursesCount = int64(len(courses))
	}

	return teachers, nil
}
