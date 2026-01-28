package services

import (
	"context"
	"errors"

	"github.com/CrossStack-Q/LMS/goSupport/internal/models"
	"github.com/CrossStack-Q/LMS/goSupport/internal/repositories"
	"github.com/CrossStack-Q/LMS/goSupport/internal/utils"
)

type UserService struct {
	repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) UpdateProfile(ctx context.Context, userID string, name string) (*models.User, error) {

	user, err := s.repo.GetByID(ctx, userID)
	if err != nil || user == nil {
		return nil, errors.New("user not found")
	}

	user.Name = name

	err = s.repo.Update(ctx, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) Auth(ctx context.Context, email, password string) (*models.User, string, error) {

	// 1. Check if user exists
	user, err := s.repo.GetByEmail(ctx, email)

	// ---------------------------- SIGNUP FLOW ----------------------------
	if err != nil || user == nil {
		// create user with name = null
		hash, err := utils.HashPassword(password)
		if err != nil {
			return nil, "", err
		}

		newUser := &models.User{
			Email:    email,
			Password: hash,
			Name:     "",        // NULL name — frontend will ask for it
			Role:     "student", // default
		}

		if err := s.repo.Create(ctx, newUser); err != nil {
			return nil, "", err
		}

		token, _ := utils.GenerateAccessToken(newUser.ID, newUser.Email, newUser.Role)
		return newUser, token, nil
	}

	// ---------------------------- LOGIN FLOW ----------------------------
	ok, err := utils.VerifyPassword(password, user.Password)
	if err != nil || !ok {
		return nil, "", errors.New("invalid email or password")
	}

	token, _ := utils.GenerateAccessToken(user.ID, user.Email, user.Role)
	return user, token, nil
}
