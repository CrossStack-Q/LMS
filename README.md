# LMS – Full‑Stack E‑Learning Platform

LMS is a full‑stack Learning Management System built using **React**, **Golang**, and **PostgreSQL**.  
It provides a complete platform for managing courses, teachers, students, schedules, analytics, payments, and AI‑powered learning tools.

---

## 🚀 Features

### 🎓 Core LMS Features
- Course creation & management  
- Lessons, modules, videos, quizzes, notes  
- Teacher dashboard  
- Student dashboard  
- Enrollments & progress tracking  
- Real‑time chat (Teacher ↔ Student)  
- Class scheduling & booking system  
- Timetable/calendar  
- Reviews & ratings  
- Certificates

---

## 🤖 AI‑Powered Features
- AI course generator (creates outlines, modules, objectives, quizzes)  
- AI study assistant for students (RAG-based Q/A)  
- Video transcription + automatic summary  
- Personalized learning recommendations  
- Smart semantic search across courses and lessons  

---

## 📊 Analytics & Insights
- Student productivity dashboard  
- Time‑based progress graphs  
- Course performance & engagement  
- Teacher revenue dashboard  
- Platform‑wide metrics  
- Admin-level system analytics  

Powered by:
- **OpenTelemetry (OTEL)**  
- **Prometheus + Grafana dashboards**  
- **Structured logging with Zap**  

---

## 🛠 Tech Stack

### Frontend
- **React / Next.js**
- **TailwindCSS + ShadCN UI**
- **TanStack Query**
- **Zustand**
- **Recharts / Chart.js**
- **WebSockets for real-time updates**

### Backend (Go)
- **Chi router (or Gin)**
- **Clean Architecture**
- **GORM or SQLC**
- **PostgreSQL**
- **Redis caching**
- **JWT authentication**
- **WebSockets**
- **OpenTelemetry (tracing)**
- **Prometheus (metrics)**

### DevOps
- **Docker** (multi-stage builds)
- **Docker Compose**
- **Kubernetes (optional)**
- **GitHub Actions CI/CD**

---

## 📦 Project Structure (Backend)

```
/cmd
  /server
      main.go

/internal
  /config
  /auth
  /users
  /courses
  /lessons
  /schedule
  /chat
  /analytics
  /ai
  /db
  /middlewares
  /utils
```

---

## 🗄 Database (PostgreSQL)

### Tables (Simplified)
- users  
- teachers  
- students  
- courses  
- modules  
- lessons  
- quizzes  
- enrollments  
- messages  
- reviews  
- schedules  
- analytics_events  

---

## 📚 API Overview

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Courses
- `GET /courses`
- `POST /courses`
- `GET /courses/{id}`

### Lessons
- `POST /courses/{id}/lessons`
- `GET /courses/{id}/lessons`

### Chat
- `WS /chat/connect`

### Scheduling
- `POST /schedule/book`
- `GET /schedule/teacher/{id}`

### AI Endpoints
- `POST /ai/generate-course`
- `POST /ai/assistant/query`

---

## 🧪 Testing
- Postman collection  
- Go unit tests  
- Integration tests with testcontainers  

---

## 🚀 How to Run (Local)

### Backend
```
docker-compose up -d
go run cmd/server/main.go
```

### Frontend
```
npm install
npm run dev
```

---