package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	DB *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{DB: db}
}

// -----------------------------
// Get all categories
// -----------------------------
func (r *CategoryRepository) ListCategories(ctx context.Context) ([]models.Category, error) {
	var cats []models.Category
	err := r.DB.WithContext(ctx).
		Order("name ASC").
		Find(&cats).Error
	return cats, err
}

// -----------------------------
// Get single category
// -----------------------------
func (r *CategoryRepository) GetCategoryByID(ctx context.Context, id int64) (*models.Category, error) {
	var cat models.Category
	err := r.DB.WithContext(ctx).
		Where("id = ?", id).
		First(&cat).Error
	if err != nil {
		return nil, err
	}
	return &cat, nil
}
