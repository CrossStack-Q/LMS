package services

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
)

type CategoryService struct {
	catRepo *repositories.CategoryRepository
	ccRepo  *repositories.CourseCategoryRepository
}

func NewCategoryService(catRepo *repositories.CategoryRepository, ccRepo *repositories.CourseCategoryRepository) *CategoryService {
	return &CategoryService{
		catRepo: catRepo,
		ccRepo:  ccRepo,
	}
}

// List all categories
func (s *CategoryService) ListCategories(ctx context.Context) ([]models.Category, error) {
	return s.catRepo.ListCategories(ctx)
}

// Get details + list of courses in category
func (s *CategoryService) GetCategoryWithCourses(ctx context.Context, id int64) (*dto.CategoryWithCoursesDTO, error) {

	cat, err := s.catRepo.GetCategoryByID(ctx, id)
	if err != nil {
		return nil, err
	}

	courses, err := s.ccRepo.ListCoursesByCategory(ctx, id)
	if err != nil {
		return nil, err
	}

	return &dto.CategoryWithCoursesDTO{
		ID:          cat.ID,
		Name:        cat.Name,
		CourseCount: cat.CourseCount,
		Courses:     courses,
	}, nil
}
