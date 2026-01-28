package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BlogRepository struct {
	DB *gorm.DB
}

func NewBlogRepository(db *gorm.DB) *BlogRepository {
	return &BlogRepository{DB: db}
}

func (r *BlogRepository) ListAllBlogs(
	ctx context.Context,
	limit,
	offset int,
) ([]dto.BlogListDTO, error) {

	var blogs []dto.BlogListDTO

	err := r.DB.WithContext(ctx).
		Table("blogs").
		Select(`
			id,
			title,
			author,
			short_desc,
			image,
			likes,
			created_at
		`).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Scan(&blogs).Error

	return blogs, err
}

func (r *BlogRepository) GetBlogByID(
	ctx context.Context,
	id uuid.UUID,
) (*models.Blog, error) {

	var blog models.Blog

	err := r.DB.WithContext(ctx).
		Where("id = ?", id).
		First(&blog).Error

	if err != nil {
		return nil, err
	}

	return &blog, nil
}
