package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
)

type CourseHandler struct {
	Service *services.CourseService
}

func NewCourseHandler(s *services.CourseService) *CourseHandler {
	return &CourseHandler{Service: s}
}

// ------------------------------------------------------------
// REGISTER ROUTES
// ------------------------------------------------------------
func (h *CourseHandler) RegisterRoutes(r chi.Router) {
	r.Get("/courses", h.GetCourses)
	r.Get("/courses/{id}", h.GetCourse)
	r.Get("/courses/{id}/lessons/{lessonID}", h.GetLesson)
}

// ------------------------------------------------------------
// GET /courses
// ------------------------------------------------------------
func (h *CourseHandler) GetCourses(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	res, err := h.Service.GetAllCourses(r.Context())
	if err != nil {
		http.Error(w, `{"error":"failed to fetch courses"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(res)
}

// ------------------------------------------------------------
// GET /courses/{id}
// Deep Course Structure
// ------------------------------------------------------------
func (h *CourseHandler) GetCourse(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, `{"error":"invalid course id"}`, http.StatusBadRequest)
		return
	}

	res, err := h.Service.GetCourseDeep(r.Context(), uint(id))
	if err != nil {
		http.Error(w, `{"error":"course not found"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(res)
}

// ------------------------------------------------------------
// GET /courses/{id}/lessons/{lessonID}
// ------------------------------------------------------------
func (h *CourseHandler) GetLesson(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	courseID, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		http.Error(w, `{"error":"invalid course id"}`, http.StatusBadRequest)
		return
	}

	lessonID, err := strconv.Atoi(chi.URLParam(r, "lessonID"))
	if err != nil {
		http.Error(w, `{"error":"invalid lesson id"}`, http.StatusBadRequest)
		return
	}

	res, err := h.Service.GetSingleLesson(r.Context(), uint(courseID), uint(lessonID))
	if err != nil {
		http.Error(w, `{"error":"lesson not found"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(res)
}
