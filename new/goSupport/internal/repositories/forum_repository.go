package repositories

import (
	"context"
	"math"
	"strings"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type ForumRepository struct {
	DB *gorm.DB
}

func NewForumRepository(db *gorm.DB) *ForumRepository {
	return &ForumRepository{DB: db}
}

func (r *ForumRepository) GetForums(
	ctx context.Context,
	sort string,
	tags []string,
	page int,
	pageSize int,
) (*dto.ForumListResponseDTO, error) {

	offset := (page - 1) * pageSize

	base := r.DB.WithContext(ctx).Model(&models.Forum{})

	if len(tags) > 0 && tags[0] != "" {
		base = base.Where("tags @> ?", pq.Array(tags))
	}

	var totalItems int64
	if err := base.Count(&totalItems).Error; err != nil {
		return nil, err
	}

	switch sort {
	case "recent":
		base = base.Order("updated_at DESC")
	case "popular":
		base = base.Order("likes DESC")
	default:
		base = base.Order("created_at DESC")
	}

	var forums []models.Forum
	if err := base.
		Limit(pageSize).
		Offset(offset).
		Find(&forums).Error; err != nil {
		return nil, err
	}

	totalPages := int(math.Ceil(float64(totalItems) / float64(pageSize)))

	res := make([]dto.ForumListDTO, 0, len(forums))
	for _, f := range forums {
		res = append(res, dto.ForumListDTO{
			ID:        f.ID,
			Author:    f.AuthorName,
			Avatar:    f.AuthorAvatar,
			Title:     f.Title,
			Body:      f.Body,
			Tags:      f.Tags,
			Views:     f.Views,
			Comments:  f.Comments,
			Likes:     f.Likes,
			CreatedAt: f.CreatedAt,
			UpdatedAt: f.UpdatedAt,
		})
	}

	return &dto.ForumListResponseDTO{
		Data: res,
		Pagination: dto.PaginationDTO{
			Page:       page,
			PageSize:   pageSize,
			TotalItems: int(totalItems),
			TotalPages: totalPages,
		},
	}, nil
}

func (r *ForumRepository) CreateForum(
	ctx context.Context,
	f *models.Forum,
) error {

	normalized := make([]string, 0, len(f.Tags))
	for _, t := range f.Tags {
		normalized = append(normalized, strings.ToLower(strings.TrimSpace(t)))
	}

	f.Tags = normalized

	return r.DB.WithContext(ctx).Create(f).Error
}
