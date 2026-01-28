package services

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
	"github.com/google/uuid"
)

type BlogService struct {
	Repo *repositories.BlogRepository
}

func NewBlogService(r *repositories.BlogRepository) *BlogService {
	return &BlogService{Repo: r}
}

func (s *BlogService) GetAllBlogs(
	ctx context.Context,
	limit,
	offset int,
) ([]dto.BlogListDTO, error) {
	return s.Repo.ListAllBlogs(ctx, limit, offset)
}

func (s *BlogService) GetBlogByID(
	ctx context.Context,
	id uuid.UUID,
) (*models.Blog, error) {
	return s.Repo.GetBlogByID(ctx, id)
}
