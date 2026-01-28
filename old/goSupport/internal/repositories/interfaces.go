package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/google/uuid"
)

// UserRepository defines persistence operations for users.
type UserRepository interface {
	Create(ctx context.Context, u *models.User) error
	GetByID(ctx context.Context, id string) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	Update(ctx context.Context, u *models.User) error
	Delete(ctx context.Context, id uint) error
	List(ctx context.Context, limit, offset int) ([]models.User, error)
}

// TeacherRepository persistence ops for teacher profile
type TeacherRepository interface {
	GetTeachers(ctx context.Context, id string, designation string) ([]models.TeacherProfile, error)
}

// CourseRepository for course persistence

// BlogRepository for blog
type BlogRepositoryInterface interface {
	ListAllBlogs(ctx context.Context, limit, offset int) ([]models.Blog, error)
	GetBlogByID(ctx context.Context, id uuid.UUID) (*models.Blog, error)
}
