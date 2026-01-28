package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/CrossStack-Q/LMS/goSupport/internal/services"
	"github.com/go-chi/chi/v5"
)

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(s *services.UserService) *UserHandler {
	return &UserHandler{service: s}
}

type signupReq struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginReq struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *UserHandler) RegisterRoutes(r chi.Router) {
	r.Post("/auth", h.Auth) // ONE endpoint for both signup/login
	r.Post("/profile/update", h.UpdateProfile)
}

func (h *UserHandler) Auth(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	user, token, err := h.service.Auth(r.Context(), req.Email, req.Password)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)

		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": "wrong Password",
		})
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "success",
		"user":    user,
		"token":   token,
	})
}

func (h *UserHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	var req struct {
		UserID string `json:"user_id"`
		Name   string `json:"name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}

	user, err := h.service.UpdateProfile(r.Context(), req.UserID, req.Name)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "profile updated",
		"user":    user,
	})
}
