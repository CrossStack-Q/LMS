package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
)

type BlogHandler struct {
	Service *services.BlogService
}

func NewBlogHandler(s *services.BlogService) *BlogHandler {
	return &BlogHandler{Service: s}
}

func (h *BlogHandler) RegisterRoutes(r chi.Router) {
	r.Get("/blogs", h.GetBlogs)
	r.Get("/blogs/{id}", h.GetBlogByID)
}

func (h *BlogHandler) GetBlogs(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	limit := 10
	offset := 0

	if l := r.URL.Query().Get("limit"); l != "" {
		if v, err := strconv.Atoi(l); err == nil {
			limit = v
		}
	}

	if o := r.URL.Query().Get("offset"); o != "" {
		if v, err := strconv.Atoi(o); err == nil {
			offset = v
		}
	}

	res, err := h.Service.GetAllBlogs(r.Context(), limit, offset)
	if err != nil {
		http.Error(w, `{"error":"failed to fetch blogs"}`, http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(res)
}

func (h *BlogHandler) GetBlogByID(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	idStr := chi.URLParam(r, "id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		http.Error(w, `{"error":"invalid blog id"}`, http.StatusBadRequest)
		return
	}

	res, err := h.Service.GetBlogByID(r.Context(), id)
	if err != nil {
		http.Error(w, `{"error":"blog not found"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(res)
}
