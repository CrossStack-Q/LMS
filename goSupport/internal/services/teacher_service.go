package services

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
)

type TeacherService struct {
	repo repositories.TeacherRepository
}

func NewTeacherService(repo repositories.TeacherRepository) *TeacherService {
	return &TeacherService{repo: repo}
}

func (s *TeacherService) GetTeachers(ctx context.Context, id string, designation string) ([]models.TeacherProfile, error) {
	return s.repo.GetTeachers(ctx, id, designation)
}
