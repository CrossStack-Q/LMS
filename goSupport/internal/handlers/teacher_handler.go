package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/go-chi/chi/v5"
)

type TeacherHandler struct {
	service *services.TeacherService
}

func NewTeacherHandler(s *services.TeacherService) *TeacherHandler {
	return &TeacherHandler{service: s}
}

func (h *TeacherHandler) RegisterRoutes(r chi.Router) {
	r.Get("/teachers", h.GetTeachers)
}

func (h *TeacherHandler) GetTeachers(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	designation := r.URL.Query().Get("designation")

	teachers, err := h.service.GetTeachers(r.Context(), id, designation)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return array directly
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(teachers)
}
