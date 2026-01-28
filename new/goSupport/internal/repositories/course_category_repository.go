package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"gorm.io/gorm"
)

type CourseCategoryRepository struct {
	DB *gorm.DB
}

func NewCourseCategoryRepository(db *gorm.DB) *CourseCategoryRepository {
	return &CourseCategoryRepository{DB: db}
}

// -----------------------------------------------------
// List courses belonging to a category
// JOIN: courses + teacher_profiles + categories
// -----------------------------------------------------
func (r *CourseCategoryRepository) ListCoursesByCategory(ctx context.Context, categoryID int64) ([]dto.CourseSummaryDTO, error) {
	var result []dto.CourseSummaryDTO

	err := r.DB.WithContext(ctx).
		Table("courses c").
		Select(`
            c.id,
            c.title,
            c.cover_image,
            c.short_desc,
            c.level,
            c.price,
            c.is_free,

            t.name AS teacher_name,
            t.profile_picture_link AS teacher_image,
            t.rating AS teacher_rating,

            cat.id AS category_id,
            cat.name AS category_name
        `).
		Joins("LEFT JOIN courses_categories cc ON cc.course_id = c.id").
		Joins("LEFT JOIN categories cat ON cat.id = cc.category_id").
		Joins("LEFT JOIN teacher_profiles t ON t.id = c.teacher_id").
		Where("cat.id = ?", categoryID).
		Order("c.created_at DESC").
		Scan(&result).Error

	return result, err
}

// -----------------------------
// Assign category to course
// -----------------------------
func (r *CourseCategoryRepository) AssignCategory(ctx context.Context, courseID, categoryID int64) error {
	return r.DB.WithContext(ctx).
		Exec(`INSERT INTO courses_categories (course_id, category_id)
              VALUES (?, ?) ON CONFLICT DO NOTHING`, courseID, categoryID).Error
}
