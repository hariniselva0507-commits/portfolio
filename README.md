# 🚀 Fully Dynamic Full-Stack Developer Portfolio

A modern, high-performance, database-driven developer portfolio and administrative content management suite built with **React**, **TypeScript**, **Bootstrap 5**, **Node.js**, **Express**, and **MongoDB**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)
![Node](https://img.shields.io/badge/Node.js-22-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)

---

## 🌟 Key Features

### 💻 Client / Frontend (React + Vite + TypeScript)
- **Distinctive UI/UX Design**: Modern dark theme with glowing violet/indigo accents, glassmorphic cards (`backdrop-filter: blur(14px)`), and smooth CSS3 transitions (not a generic Bootstrap template).
- **Theme Toggle**: Real-time switch between Dark and Light modes with `localStorage` persistence and Bootstrap 5 theme integration.
- **Dynamic Content**: 100% database-driven. All portfolio data (projects, skills, career history, bio, socials, site settings) is retrieved via Axios REST API endpoints.
- **Public Pages**:
  - **Home**: Dynamic hero section with animated cycling title, profile badge, featured projects, top skills matrix, resume download tracker, and contact call-to-action banner.
  - **About**: In-depth professional biography, career aspirations, engineering philosophy, and live stats (years experience, shipped projects, satisfied clients).
  - **Skills**: Categorized technical competencies (Frontend, Backend, Database, Programming Languages, Developer Tools) with proficiency progress bars, years of experience, and live text search.
  - **Projects**: Searchable and category-filtered project showcase with pagination, GitHub links, live demonstration links, and dedicated project detail pages (`/projects/:id`).
  - **Experience & Education**: Timeline for full-time roles, software engineering internships, academic degrees, and verified industry certifications.
  - **Contact**: Interactive contact form with client-side & server-side validation, rate limiting, and an anti-bot honeypot spam protection trap (`website_hp`).

### 🛡️ Admin Dashboard (`/admin`)
- **Secure Admin Access**: JWT authentication with bcrypt password hashing and route guards (`ProtectedRoute`).
- **Dashboard Overview**: Live statistical counters (total projects, skills, messages, unread count, resume downloads) and recent incoming message previews.
- **Comprehensive CRUD Modules**:
  - **Projects Manager**: Create, view, edit, delete, toggle featured status, and toggle public visibility.
  - **Skills Manager**: Add and update skills across 5 categories with proficiency percentages and icons.
  - **Experience & Internships**: Manage job titles, companies, locations, dates, and key contribution bullets.
  - **Education**: Manage universities, degrees, GPA/honors, and achievements.
  - **Certifications**: Manage industry badges, issuing organizations, credential IDs, and verification links.
  - **Profile & Biography Editor**: Live modification of hero tagline, bio, resume URL, contact details, and social links.
  - **Messages Inbox**: View sender details, toggle read/unread status, delete inquiries, and one-click mailto replies.
  - **Website Settings**: Configure site title, SEO meta description, "Available for Hire" status switch, and footer text.

### ⚡ Server & REST API (Express + TypeScript + MongoDB)
- **Strict Architecture**: Separation of concerns across controllers, models, routes, middlewares, and services.
- **MongoDB & Mongoose**: Strongly typed Mongoose schemas with validation, indexes, and timestamps.
- **Embedded Database Fallback**: Connects directly to external MongoDB or MongoDB Atlas via `MONGODB_URI`. If no local daemon is running, it automatically boots a persistent embedded MongoDB engine for seamless zero-config local development.
- **Security & Hardening**:
  - `bcryptjs` password hashing (salt rounds: 10).
  - JWT Bearer token authentication for admin-only routes.
  - `express-rate-limit` for contact submissions (max 5 per 15 min) and login attempts (max 10 per 15 min).
  - Multer file uploads with strict MIME type and extension validation (max 10MB).
  - Anti-bot honeypot filtering on contact forms.
  - Configurable CORS whitelist.
  - Centralized error handling returning standardized JSON payloads.

---

## 📁 Project Structure

```
portfolio/
├── client/                      # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── assets/              # Static icons and graphics
│   │   ├── components/          # Reusable UI components (Navbar, Footer, ProjectCard, etc.)
│   │   ├── hooks/               # useAuth, useTheme context providers
│   │   ├── layouts/             # MainLayout (public) & AdminLayout (dashboard)
│   │   ├── pages/               # Home, About, Skills, Projects, Experience, Contact, Admin
│   │   ├── services/            # Axios API clients for projects, skills, auth, etc.
│   │   ├── styles/              # Custom design system & theme CSS
│   │   ├── types/               # TypeScript interfaces & data contracts
│   │   ├── App.tsx              # Router definition
│   │   └── main.tsx             # Application bootstrap
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                      # Express + TypeScript Backend API
│   ├── src/
│   │   ├── config/              # MongoDB connection & JWT settings
│   │   ├── controllers/         # Request handlers for auth, projects, skills, etc.
│   │   ├── middleware/          # Auth, error handling, rate limiting, multer
│   │   ├── models/              # Mongoose schemas (User, Project, Skill, Profile, etc.)
│   │   ├── routes/              # Express API route endpoints
│   │   ├── scripts/             # seed.ts database population script
│   │   ├── app.ts               # Express configuration & CORS
│   │   └── server.ts            # Server entrypoint
│   ├── uploads/                 # Uploaded media and resume PDFs
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── package.json                 # Monorepo root scripts (dev, build, seed)
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (v20 or v22 LTS recommended)
- **npm**: v9+
- **MongoDB**: Local MongoDB instance, MongoDB Atlas URI, or default embedded mode.

### 2. Installation
Install all dependencies in root, client, and server:
```bash
# In project root
npm run dev
```
Or install individual workspaces:
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Environment Variables

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=super_secret_portfolio_jwt_key_2026_modern_dev
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_DEFAULT_EMAIL=admin@portfolio.dev
ADMIN_DEFAULT_PASSWORD=Admin@12345
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database with Sample Data
Populate MongoDB with sample projects, skills, experiences, education, and the administrator account:
```bash
# From server directory
npm run seed
```

### 5. Running the Application

**Run Frontend & Backend concurrently from the root directory:**
```bash
npm run dev
```

Or run separately:
- **Backend**: `cd server && npm run dev` (Runs on `http://localhost:5000`)
- **Frontend**: `cd client && npm run dev` (Runs on `http://localhost:5173`)

---

## 🔐 Admin Dashboard Credentials

Access the administration dashboard at:
👉 **`http://localhost:5173/admin/login`**

- **Default Email**: `admin@portfolio.dev`
- **Default Password**: `Admin@12345`

*(Click the "Auto-fill" button on the login screen for instant credential population)*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | Admin login & token generation | No (Rate-limited) |
| `POST` | `/api/auth/setup` | Create initial administrator account | No (Only if 0 users exist) |
| `GET` | `/api/auth/me` | Verify active session | Yes (Bearer Token) |
| `GET` | `/api/profile` | Retrieve developer biography & socials | No |
| `PUT` | `/api/profile` | Update profile information | Yes (Admin) |
| `GET` | `/api/projects` | List projects (query: `search`, `category`, `featured`, `page`) | No |
| `GET` | `/api/projects/:id` | Retrieve single project by ID or slug | No |
| `POST` | `/api/projects` | Create a new project | Yes (Admin) |
| `PUT` | `/api/projects/:id` | Update an existing project | Yes (Admin) |
| `DELETE` | `/api/projects/:id` | Delete a project | Yes (Admin) |
| `PATCH` | `/api/projects/:id/featured` | Toggle project featured status | Yes (Admin) |
| `GET` | `/api/skills` | List skills (grouped or flat) | No |
| `POST` | `/api/skills` | Create a new skill | Yes (Admin) |
| `PUT` | `/api/skills/:id` | Update a skill | Yes (Admin) |
| `DELETE` | `/api/skills/:id` | Delete a skill | Yes (Admin) |
| `GET` | `/api/experience` | List work experience and internships | No |
| `POST` | `/api/experience` | Add new experience entry | Yes (Admin) |
| `PUT` | `/api/experience/:id` | Update experience entry | Yes (Admin) |
| `DELETE` | `/api/experience/:id` | Delete experience entry | Yes (Admin) |
| `GET` | `/api/education` | List education records | No |
| `POST` | `/api/education` | Add education record | Yes (Admin) |
| `PUT` | `/api/education/:id` | Update education record | Yes (Admin) |
| `DELETE` | `/api/education/:id` | Delete education record | Yes (Admin) |
| `GET` | `/api/certifications` | List professional certifications | No |
| `POST` | `/api/certifications` | Add certification record | Yes (Admin) |
| `PUT` | `/api/certifications/:id` | Update certification record | Yes (Admin) |
| `DELETE` | `/api/certifications/:id` | Delete certification record | Yes (Admin) |
| `POST` | `/api/contact` | Submit message (with honeypot & validation) | No (Rate-limited) |
| `GET` | `/api/contact` | Retrieve messages inbox | Yes (Admin) |
| `PATCH` | `/api/contact/:id/read` | Mark message as read/unread | Yes (Admin) |
| `DELETE` | `/api/contact/:id` | Delete message | Yes (Admin) |
| `GET` | `/api/settings` | Get site runtime settings | No |
| `PUT` | `/api/settings` | Update website settings | Yes (Admin) |
| `POST` | `/api/settings/download-resume` | Increment resume download counter | No |
| `GET` | `/api/stats` | Retrieve overview metrics for dashboard | Yes (Admin) |
| `POST` | `/api/upload` | Upload media or resume attachment | Yes (Admin) |

---

## 🚢 Production Deployment

### 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist network access (`0.0.0.0/0`).
3. Set your connection string in the backend environment:
   `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio_db?retryWrites=true&w=majority`

### 2. Backend Deployment (Render / Railway / Heroku / DigitalOcean)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start` (or `node dist/server.js`)
- **Environment Variables**:
  - `PORT=5000`
  - `NODE_ENV=production`
  - `MONGODB_URI=<Your Atlas URI>`
  - `JWT_SECRET=<Generate random 64-character secret>`
  - `CLIENT_URL=https://your-portfolio-frontend.vercel.app`

### 3. Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**:
  - `VITE_API_URL=https://your-portfolio-backend.onrender.com/api`

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
