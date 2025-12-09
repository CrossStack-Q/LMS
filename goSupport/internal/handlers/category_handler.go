package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/go-chi/chi/v5"
)

type CategoryHandler struct {
	Svc *services.CategoryService
}

func NewCategoryHandler(s *services.CategoryService) *CategoryHandler {
	return &CategoryHandler{Svc: s}
}

func (h *CategoryHandler) RegisterRoutes(r chi.Router) {
	r.Get("/categories", h.ListCategories)
	r.Get("/categories/{id}", h.GetCategoryWithCourses)
}

// GET /categories
func (h *CategoryHandler) ListCategories(w http.ResponseWriter, r *http.Request) {
	res, err := h.Svc.ListCategories(r.Context())
	if err != nil {
		http.Error(w, "failed to fetch categories", 500)
		return
	}
	json.NewEncoder(w).Encode(res)
}

// GET /categories/{id}
func (h *CategoryHandler) GetCategoryWithCourses(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.ParseInt(chi.URLParam(r, "id"), 10, 64)

	res, err := h.Svc.GetCategoryWithCourses(r.Context(), id)
	if err != nil {
		http.Error(w, "category not found", 404)
		return
	}

	json.NewEncoder(w).Encode(res)
}
