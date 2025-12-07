package services

import (
	"context"
	"errors"

	"github.com/CrossStack-Q/LMS/goSupport/internal/dto"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
)

type CourseService struct {
	Repo *repositories.CourseRepository
}

func NewCourseService(r *repositories.CourseRepository) *CourseService {
	return &CourseService{Repo: r}
}

// ------------------------------------------------------------
// 1) GET ALL COURSES (SUMMARY LIST)
// ------------------------------------------------------------
func (s *CourseService) GetAllCourses(ctx context.Context) ([]dto.CourseSummaryDTO, error) {
	courses, err := s.Repo.GetAllCourses(ctx)
	if err != nil {
		return nil, err
	}

	resp := []dto.CourseSummaryDTO{}

	for _, c := range courses {
		resp = append(resp, dto.CourseSummaryDTO{
			ID:        c.ID,
			Title:     c.Title,
			Cover:     c.CoverImage,
			ShortDesc: c.ShortDesc,
			Category:  c.Category,
			// Rating:    4.9, // You do not have rating in DB yet
			CreatedAt:   c.CreatedAt,
			UpdatedAt:   c.UpdatedAt,
			Description: c.Description,
			TeacherID:   c.TeacherID,
			Level:       c.Level,
			Price:       c.Price,
			IS_Free:     c.IsFree,
		})
	}

	return resp, nil
}

// ------------------------------------------------------------
// 2) GET FULL COURSE → Sections → Lessons → LessonContents
// ------------------------------------------------------------
func (s *CourseService) GetCourseDeep(ctx context.Context, id uint) (*dto.CourseDTO, error) {

	// Load base course
	course, err := s.Repo.GetCourseByID(ctx, id)
	if err != nil {
		return nil, errors.New("course not found")
	}

	// Load course details
	det, _ := s.Repo.GetCourseDetails(ctx, id)

	// Build response root
	res := &dto.CourseDTO{
		ID:        course.ID,
		Title:     course.Title,
		Desc:      course.Description,
		Cover:     course.CoverImage,
		TeacherID: course.TeacherID,
		ShortDesc: course.ShortDesc,
		Category:  course.Category,
		Level:     course.Level,
		Price:     float64(course.Price),
		IsFree:    course.IsFree,
		Details: dto.CourseDetailsDTO{
			LongDesc:       det.LongDesc,
			Goals:          det.Goals,
			Requirements:   det.Requirements,
			TargetAudience: det.TargetAudience,
			PreviewVideo:   det.PreviewVideo,
			TotalHours:     det.TotalHours,
			TotalLessons:   det.TotalLessons,
			TotalSections:  det.TotalSections,
		},
	}

	// Load sections
	sections, _ := s.Repo.GetSectionsByCourse(ctx, id)

	for _, sec := range sections {
		secDTO := dto.SectionDTO{
			ID:    sec.ID,
			Title: sec.Title,
			Desc:  sec.Description,
			Order: sec.OrderIndex,
		}

		// Load lessons in this section
		lessons, _ := s.Repo.GetLessons(ctx, uint(sec.ID))

		for _, les := range lessons {

			lessonDTO := dto.LessonDTO{
				ID:         les.ID,
				Title:      les.Title,
				Type:       les.LessonType,
				VideoURL:   les.VideoURL,
				Duration:   les.DurationSec,
				OrderIndex: int(les.OrderIndex),
			}

			// Load contents for this lesson
			contents, _ := s.Repo.GetLessonContents(ctx, uint(les.ID))

			for _, c := range contents {
				lessonDTO.Contents = append(lessonDTO.Contents, dto.LessonContentDTO{
					ID:         c.ID,
					Type:       c.Type,
					Value:      c.Value,
					OrderIndex: int(c.OrderIndex),
				})
			}

			secDTO.Lessons = append(secDTO.Lessons, lessonDTO)
		}

		res.Sections = append(res.Sections, secDTO)
	}

	return res, nil
}

// ------------------------------------------------------------
// 3) GET SINGLE LESSON WITH CONTENTS
// ------------------------------------------------------------
func (s *CourseService) GetSingleLesson(ctx context.Context, courseID, lessonID uint) (*dto.LessonDTO, error) {

	lesson, err := s.Repo.GetLessonByID(ctx, courseID, lessonID)
	if err != nil {
		return nil, errors.New("lesson not found")
	}

	res := &dto.LessonDTO{
		ID:         lesson.ID,
		Title:      lesson.Title,
		Type:       lesson.LessonType,
		VideoURL:   lesson.VideoURL,
		Duration:   lesson.DurationSec,
		OrderIndex: int(lesson.OrderIndex),
	}

	contents, _ := s.Repo.GetLessonContents(ctx, uint(lesson.ID))

	for _, c := range contents {
		res.Contents = append(res.Contents, dto.LessonContentDTO{
			ID:         c.ID,
			Type:       c.Type,
			Value:      c.Value,
			OrderIndex: int(c.OrderIndex),
		})
	}

	return res, nil
}
