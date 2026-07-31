# Notes API

A full-stack notes application with JWT authentication, built with Express, MongoDB, and React. Users can register, log in, and manage their own private notes through a REST API with a React frontend.

Live app: https://notes-api-azure-seven.vercel.app
Live API: https://notes-api-production-010d.up.railway.app
API docs (Swagger): https://notes-api-production-010d.up.railway.app/api-docs

---

## Tech Stack

Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Zod for request validation
- Helmet for secure HTTP headers
- express-rate-limit for rate limiting
- Swagger/OpenAPI for API documentation
- Docker

Frontend
- React (Vite)
- React Router
- Axios
- Context API for auth state

Deployment
- Frontend: Vercel
- Backend: Railway (Docker)
- Database: MongoDB Atlas

---

Features

- User registration and login with JWT-based authentication
- Passwords hashed with bcrypt, never stored in plaintext
- Notes are private per user — ownership enforced on every read/write via atomic, ownership-scoped database queries
- Full CRUD on notes (create, read, update, delete)
- Input validation on all endpoints via Zod schemas
- Rate limiting (stricter on auth routes to reduce brute-force risk)
- Centralized error handling
- Auto-generated Swagger API documentation

---

Notes-API/
├── index.js # App entry point
├── Dockerfile
├── docker-compose.yml
├── src/
│ ├── db.js # MongoDB connection
│ ├── config/
│ │ └── swagger.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── noteController.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ ├── errorMiddleware.js
│ │ └── validateMiddleware.js
│ ├── models/
│ │ ├── User.js
│ │ └── Note.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── noteRoutes.js
│ └── validators/
│ ├── authValidator.js
│ └── noteValidator.js
└── frontend/
└── src/
├── api/axios.js
├── context/AuthContext.jsx
├── components/
├── pages/
└── App.jsxProject Structure

---

Getting Started (Local Setup)

Prerequisites
- Node.js 20+
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

Backend

```bash
git clone https://github.com/aryankhalati/Notes-API.git
cd Notes-API
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

Backend runs on `http://localhost:5000` by default.

Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

> Note: update `frontend/src/api/axios.js`'s `baseURL` to point to your local backend (`http://localhost:5000/api`) if testing locally instead of the deployed API.

### Environment Variables

See `.env.example` for required variables:

| Variable | Description |
|---|---|
| `JWT_SECRET` | Secret used to sign JWTs |
| `MONGO_URI` | MongoDB connection string |
| `PORT` | Port for the backend server (defaults to 5000) |
| `ALLOWED_ORIGIN` | Allowed CORS origin (your frontend URL) |

---

API Endpoints

Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT | No |
| GET | `/api/auth/me` | Get current logged-in user | Yes |

Notes

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/notes` | Create a new note | Yes |
| GET | `/api/notes` | Get all notes for the logged-in user | Yes |
| GET | `/api/notes/:id` | Get a single note | Yes |
| PUT | `/api/notes/:id` | Update a note | Yes |
| DELETE | `/api/notes/:id` | Delete a note | Yes |

Full interactive documentation available at [`/api-docs`](https://notes-api-production-010d.up.railway.app/api-docs).

---

Security Notes

- Notes are scoped to their owner using atomic MongoDB queries (`findOneAndUpdate`/`findOneAndDelete` combined with both `_id` and `userId`), preventing race conditions between checking ownership and performing the update/delete.
- Auth routes are rate-limited more strictly than general API routes to reduce brute-force login attempts.
- Passwords are hashed with bcrypt before storage; plaintext passwords are never persisted or logged.

---

Deployment

This project is deployed across three services:
- Frontend — Vercel, auto-deploys from the `frontend/` directory on push to `main`
- Backend — Railway, deployed via Docker, auto-deploys on push to `main`
- Database — MongoDB Atlas (M0 free tier)

---

Screenshots

_Add screenshots here — e.g. login page, notes list, note detail view._

---

License

This project is for educational/portfolio purposes.