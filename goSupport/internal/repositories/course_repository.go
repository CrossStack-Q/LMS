package repositories

import (
	"context"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"gorm.io/gorm"
)

type CourseRepository struct {
	DB *gorm.DB
}

func NewCourseRepository(db *gorm.DB) *CourseRepository {
	return &CourseRepository{DB: db}
}

// ------------------------------------------------------------
// 1) GET ALL COURSES
// ------------------------------------------------------------
func (r *CourseRepository) GetAllCourses(ctx context.Context) ([]models.Course, error) {
	var courses []models.Course
	err := r.DB.WithContext(ctx).
		Order("created_at DESC").
		Find(&courses).Error
	return courses, err
}

// ------------------------------------------------------------
// 2) GET COURSE BY ID
// ------------------------------------------------------------
func (r *CourseRepository) GetCourseByID(ctx context.Context, id uint) (*models.Course, error) {
	var course models.Course
	err := r.DB.WithContext(ctx).
		Where("id = ?", id).
		First(&course).Error

	if err != nil {
		return nil, err
	}
	return &course, nil
}

// ------------------------------------------------------------
// 3) GET COURSE DETAILS
// ------------------------------------------------------------
func (r *CourseRepository) GetCourseDetails(ctx context.Context, courseID uint) (*models.CourseDetails, error) {
	var det models.CourseDetails
	err := r.DB.WithContext(ctx).
		Where("course_id = ?", courseID).
		First(&det).Error

	return &det, err
}

// ------------------------------------------------------------
// 4) GET SECTIONS BY COURSE (IMPORTANT: you do NOT have modules)
// ------------------------------------------------------------
func (r *CourseRepository) GetSectionsByCourse(ctx context.Context, courseID uint) ([]models.Section, error) {
	var secs []models.Section
	err := r.DB.WithContext(ctx).
		Where("course_id = ?", courseID).
		Order("order_index ASC").
		Find(&secs).Error

	return secs, err
}

// ------------------------------------------------------------
// 5) GET LESSONS IN A SECTION
// ------------------------------------------------------------
func (r *CourseRepository) GetLessons(ctx context.Context, sectionID uint) ([]models.Lesson, error) {
	var les []models.Lesson
	err := r.DB.WithContext(ctx).
		Where("section_id = ?", sectionID).
		Order("order_index ASC").
		Find(&les).Error

	return les, err
}

// ------------------------------------------------------------
// 6) GET LESSON CONTENTS
// ------------------------------------------------------------
func (r *CourseRepository) GetLessonContents(ctx context.Context, lessonID uint) ([]models.LessonContent, error) {
	var cont []models.LessonContent
	err := r.DB.WithContext(ctx).
		Where("lesson_id = ?", lessonID).
		Order("order_index ASC").
		Find(&cont).Error

	return cont, err
}

// ------------------------------------------------------------
// 7) GET A SINGLE LESSON
// ------------------------------------------------------------
func (r *CourseRepository) GetLessonByID(ctx context.Context, courseID, lessonID uint) (*models.Lesson, error) {
	var les models.Lesson
	err := r.DB.WithContext(ctx).
		Where("id = ? AND course_id = ?", lessonID, courseID).
		First(&les).Error

	return &les, err
}
