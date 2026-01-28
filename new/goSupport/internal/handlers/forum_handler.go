package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/go-chi/chi/v5"
)

type ForumHandler struct {
	Service *services.ForumService
}

func NewForumHandler(s *services.ForumService) *ForumHandler {
	return &ForumHandler{Service: s}
}

func (h *ForumHandler) RegisterRoutes(r chi.Router) {
	r.Get("/forums", h.GetForums)
	r.Post("/forum", h.CreateForum)
}

type CreateForumRequest struct {
	Title  string   `json:"title"`
	Body   string   `json:"body"`
	Author string   `json:"author"`
	Avatar string   `json:"avatar"`
	Tags   []string `json:"tags"`
}

func (h *ForumHandler) GetForums(w http.ResponseWriter, r *http.Request) {
	sort := r.URL.Query().Get("sort")

	var tags []string
	if t := r.URL.Query().Get("tags"); t != "" {
		tags = strings.Split(t, ",")
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	res, err := h.Service.ListForums(
		r.Context(),
		sort,
		tags,
		page,
		2,
	)
	if err != nil {
		http.Error(w, "failed to fetch forums", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func (h *ForumHandler) CreateForum(w http.ResponseWriter, r *http.Request) {
	var req CreateForumRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	forum := &models.Forum{
		Title:        req.Title,
		Body:         req.Body,
		AuthorName:   req.Author,
		AuthorAvatar: req.Avatar,
		Tags:         req.Tags,
		Views:        0,
		Comments:     0,
		Likes:        0,
	}

	if err := h.Service.CreateForum(r.Context(), forum); err != nil {
		http.Error(w, "failed to create forum", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(forum)
}
