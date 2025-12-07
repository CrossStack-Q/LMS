package middleware

import "net/http"

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Allow ANY origin
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Allow ANY method
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")

		// Allow ANY header
		w.Header().Set("Access-Control-Allow-Headers", "*")

		// Allow credentials if needed (optional)
		// w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests instantly
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
