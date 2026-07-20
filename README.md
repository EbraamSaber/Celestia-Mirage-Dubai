<div align="center">

# ✦ Celestia Mirage Dubai ✦

### *An Ultra-Premium Luxury Hotel Platform*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-ISC-gold?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Project Description

**Celestia Mirage Dubai** is a full-featured, ultra-premium hotel web platform built to deliver an immersive five-star digital experience. Inspired by the grandeur of Dubai hospitality, the platform combines elegant design with powerful functionality — offering guests seamless suite bookings, curated luxury experiences, and AI-powered concierge services, all within a single cohesive interface.

The application is fully multilingual (i18n-ready), animated with Framer Motion and GSAP, and structured around a modern React + Vite architecture for blazing-fast performance.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏨 **Suite Browsing** | Explore a curated catalog of luxury suites with rich imagery and detailed descriptions |
| 📅 **Booking System** | Multi-step reservation flow with form validation powered by React Hook Form & Zod |
| 🍽️ **Restaurants** | Showcase of world-class dining venues within the hotel |
| 💆 **Spa & Wellness** | Dedicated spa page featuring treatments and wellness packages |
| 🎭 **Experiences** | Curated luxury experiences and activities available to guests |
| 🚗 **Fleet & Cars** | Premium chauffeur and vehicle service listings |
| 🎪 **Events** | Weddings, corporate events, and private gatherings management |
| 🤖 **AI Concierge** | Floating AI chat widget for real-time guest assistance |
| 🌐 **Concierge Page** | Full concierge services hub for personalized guest requests |
| 💎 **Loyalty Program** | Rewards dashboard for returning guests and members |
| 📊 **Guest Dashboard** | Personalized dashboard for managing bookings and preferences |
| ⭐ **Reviews** | Guest testimonials and ratings showcase |
| 📬 **Contact** | Dynamic contact forms with departmental routing |
| 🔐 **Admin Panel** | Secure admin dashboard with analytics and data visualizations (Recharts) |
| 🌍 **Multilingual Support** | Full i18n integration via i18next & react-i18next |
| 🔴 **Real-time Ready** | Socket.IO client integrated for live concierge and notifications |

---

## 🛠️ Technologies Used

### Core
- **[React 19](https://react.dev/)** — Component-based UI library
- **[Vite 8](https://vite.dev/)** — Next-generation frontend build tool with HMR

### Routing & State
- **[React Router DOM v7](https://reactrouter.com/)** — Client-side routing and navigation

### Animations
- **[Framer Motion](https://www.framer.com/motion/)** — Declarative animations and transitions
- **[GSAP 3](https://gsap.com/)** — High-performance JavaScript animations

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** — Performant, flexible form management
- **[Zod](https://zod.dev/)** — TypeScript-first schema validation

### Internationalization
- **[i18next](https://www.i18next.com/)** + **[react-i18next](https://react.i18next.com/)** — Full multilingual support

### Data & Charts
- **[Recharts](https://recharts.org/)** — Composable chart library for the admin dashboard
- **[Axios](https://axios-http.com/)** — Promise-based HTTP client

### UI & Media
- **[Swiper](https://swiperjs.com/)** — Touch-friendly slider/carousel component
- **[React Icons](https://react-icons.github.io/react-icons/)** — Icon library
- **[React Helmet Async](https://github.com/staylor/react-helmet-async)** — Dynamic `<head>` management for SEO

### Real-time
- **[Socket.IO Client](https://socket.io/)** — WebSocket integration for live features

### Linting
- **ESLint** with `react-hooks` and `react-refresh` plugins

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **npm** (comes bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EbraamSaber/Celestia-Mirage-Dubai.git
   cd Celestia-Mirage-Dubai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`** by default.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server with HMR |
| `npm run build` | Build the production-ready bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 📁 Project Structure

```
celestia-mirage-dubai/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, and media
│   ├── components/
│   │   ├── AIChat/         # Floating AI concierge widget
│   │   ├── Navbar/         # Global navigation bar
│   │   └── Footer/         # Global footer
│   ├── i18n/               # Internationalization configuration & translations
│   ├── pages/
│   │   ├── Landing/        # Home / Hero page
│   │   ├── Suites/         # Suite listings
│   │   ├── Booking/        # Multi-step booking flow
│   │   ├── Restaurants/    # Dining venues
│   │   ├── Spa/            # Spa & wellness
│   │   ├── Experiences/    # Luxury experiences
│   │   ├── Cars/           # Fleet & chauffeur services
│   │   ├── Events/         # Events & gatherings
│   │   ├── Concierge/      # Concierge services hub
│   │   ├── Dashboard/      # Guest personal dashboard
│   │   ├── Loyalty/        # Loyalty & rewards program
│   │   ├── Reviews/        # Guest reviews & testimonials
│   │   ├── Contact/        # Contact forms
│   │   └── Admin/          # Admin panel & analytics
│   ├── App.jsx             # Root component & route definitions
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global styles & design tokens
│   └── App.css             # App-level styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Project manifest & scripts
```

---

<div align="center">

**Celestia Mirage Dubai** — *Where Luxury Meets the Digital Age*

</div>
