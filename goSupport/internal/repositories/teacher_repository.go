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

func (r *TeacherRepo) GetTeachers(ctx context.Context, id string, designation string) ([]models.TeacherProfile, error) {
	var teachers []models.TeacherProfile
	query := r.db.WithContext(ctx).Model(&models.TeacherProfile{})

	if id != "" {
		query = query.Where("id = ?", id)
	}

	if designation != "" {
		query = query.Where("designation ILIKE ?", "%"+designation+"%")
	}

	err := query.Find(&teachers).Error
	if err != nil {
		return nil, err
	}

	return teachers, nil
}
