# 🛡️ TicketShield — Event Ticket Booking Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) event ticket booking platform with **Tailwind CSS v4**, featuring a premium UI, demo mode fallback, and DevSecOps-ready infrastructure.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-brightgreen) ![Tailwind](https://img.shields.io/badge/CSS-TailwindCSS_v4-06B6D4) ![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED) ![K8s](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Home Page** | Hero section with search, trending events, category filters, and stats |
| 🎫 **Event Listing** | Browse, search, sort, and filter events by category |
| 📄 **Event Details** | Full event page with seat availability, ticket selection, and booking |
| 🛒 **Checkout** | Secure booking flow with payment UI and order confirmation with QR |
| 📊 **User Dashboard** | Login/register, booking history, profile, and stats tracking |
| 🎨 **Premium UI** | Glassmorphism, animations, responsive design, dark-mode ready |
| 🔄 **Demo Mode** | Falls back to in-memory data when MongoDB is unavailable |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite 8
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** for client-side routing
- **React Icons** for iconography

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

### DevOps
- **Docker** / **Docker Compose** for containerization
- **Kubernetes** manifests for orchestration
- **GitHub Actions** CI/CD pipeline ready
- **Nginx** for production frontend serving

---

## 📁 Project Structure

```
ticketshield/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── TicketSelector.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── EventListing.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── context/            # Global state management
│   │   │   └── BookingContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Design system & Tailwind config
│   ├── index.html
│   ├── vite.config.js
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── Event.js
│   │   ├── Booking.js
│   │   └── User.js
│   ├── routes/
│   │   ├── events.js
│   │   ├── bookings.js
│   │   └── users.js
│   ├── server.js               # Express app + demo mode
│   ├── seed.js                 # Database seeder
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── k8s/                        # Kubernetes manifests
├── .github/                    # CI/CD workflows
├── docker-compose.yaml
├── Dockerfile
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **MongoDB** (optional — app runs in demo mode without it)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ticketshield.git
cd ticketshield
```

### 2. Setup Backend
```bash
cd server
cp .env.example .env    # Configure environment variables
npm install
npm run dev             # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev             # Starts on http://localhost:3000
```

### 4. (Optional) Run with Docker
```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# MongoDB:  localhost:27017
```

### 5. (Optional) Seed Database
```bash
cd server
npm run seed            # Populates MongoDB with sample events
```

---

## 🔑 Demo Credentials

The app runs in **demo mode** when MongoDB is not connected.

| Field    | Value                        |
|----------|------------------------------|
| Email    | `demo@ticketshield.com`      |
| Password | `demo1234`                   |

---

## 📡 API Endpoints

| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| GET    | `/api/events`               | List events (filter/search) |
| GET    | `/api/events/:id`           | Get event details         |
| POST   | `/api/users/register`       | Register new user         |
| POST   | `/api/users/login`          | User login                |
| POST   | `/api/bookings`             | Create booking            |
| GET    | `/api/bookings/user/:id`    | Get user's bookings       |
| GET    | `/api/health`               | Health check              |

---

## 🔮 Future Scope

- **Admin Dashboard** — Event management, analytics, user management
- **Payment Integration** — Razorpay / Stripe
- **DevSecOps Pipeline** — SonarQube, Trivy, OWASP ZAP, DefectDojo
- **CI/CD** — Jenkins / GitHub Actions + ArgoCD
- **Monitoring** — Prometheus + Grafana dashboards
- **Push Notifications** — Email/SMS booking confirmations
- **Seat Map** — Interactive seat selection UI

---

## 📜 License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ using the <strong>MERN Stack</strong>
</p>
