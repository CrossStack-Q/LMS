package services

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
)

type ForumService struct {
	Repo *repositories.ForumRepository
}

func NewForumService(r *repositories.ForumRepository) *ForumService {
	return &ForumService{Repo: r}
}

func (s *ForumService) ListForums(
	ctx context.Context,
	sort string,
	tags []string,
	page int,
	pageSize int,
) (*dto.ForumListResponseDTO, error) {
	return s.Repo.GetForums(ctx, sort, tags, page, pageSize)
}

func (s *ForumService) CreateForum(
	ctx context.Context,
	f *models.Forum,
) error {
	return s.Repo.CreateForum(ctx, f)
}
