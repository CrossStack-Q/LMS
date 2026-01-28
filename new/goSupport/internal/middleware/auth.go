package middleware

import (
	"context"
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type ctxKey string

var CtxUserIDKey = ctxKey("user_id")

// func VerifyJWTFromHeader(next http.Handler) http.Handler {

// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		auth := r.Header.Get("Authorization")
// 		if auth == "" {
// 			http.Error(w, "missing authorization", http.StatusUnauthorized)
// 			return
// 		}
// 		parts := strings.SplitN(auth, " ", 2)
// 		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
// 			http.Error(w, "invalid authorization header", http.StatusUnauthorized)
// 			return
// 		}
// 		userID, err := parseToken(parts[1])
// 		if err != nil {
// 			http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
// 			return
// 		}
// 		ctx := context.WithValue(r.Context(), CtxUserIDKey, userID)
// 		next.ServeHTTP(w, r.WithContext(ctx))
// 	})
// }

func VerifyJWTFromHeader(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			http.Error(w, "missing authorization", http.StatusUnauthorized)
			return
		}
		parts := strings.SplitN(auth, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			http.Error(w, "invalid authorization header", http.StatusUnauthorized)
			return
		}

		userID, err := ParseJWT(parts[1])
		if err != nil {
			http.Error(w, "invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), CtxUserIDKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func parseToken(tokenStr string) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev_secret_key"
	}
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil || !token.Valid {
		return "", errors.New("invalid token")
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", errors.New("invalid claims")
	}
	if sub, ok := claims["sub"].(string); ok && sub != "" {
		return sub, nil
	}
	if uid, ok := claims["user_id"].(string); ok && uid != "" {
		return uid, nil
	}
	return "", errors.New("user not found in token")
}
