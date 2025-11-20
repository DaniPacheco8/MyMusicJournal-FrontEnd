# My Music Journal - Frontend

A modern web application for tracking and documenting concerts and musical events. Built with React and Vite, this application allows users to create, edit, and delete concert entries with detailed information including artist, date, venue, location, rating, and personal notes.

<img width="1210" height="735" alt="img" src="https://github.com/user-attachments/assets/e76a8062-173a-4ee9-8b77-8bcd1309f843" />


## 🎯 Project Overview

MyMusicJournal is a concert diary application that helps music enthusiasts document and manage their concert experiences. Users can browse concerts on an interactive map, rate performances, write personal notes, and build a comprehensive music history. The application features user authentication, real-time data synchronization, and an intuitive interface designed for music lovers.

## ⚙️ Technology Stack

| Category                  | Technologies                                       |
| ------------------------- | -------------------------------------------------- |
| **Frontend Framework**    | React 19 + Vite 7                                  |
| **Styling**               | SCSS Modules + PostCSS                             |
| **Routing**               | React Router DOM v7                                |
| **State Management**      | React Context API (Auth, Toast)                    |
| **HTTP Client**           | Axios with JWT Authentication                      |
| **UI Components & Icons** | Lucide React                                       |
| **Mapping**               | Leaflet + React-Leaflet                            |
| **Form Validation**       | Custom validators (email, password, notes, rating) |
| **Error Handling**        | React Error Boundary + Toast Notifications         |
| **Testing**               | Vitest + jsdom                                     |
| **Code Quality**          | ESLint + Prettier                                  |
| **Version Control**       | Git + GitHub                                       |

## ✨ Features

### 🔓 Public Access

- Landing page with platform overview
- Hero section with call-to-action
- Features showcase
- How it works section
- User testimonials
- Footer with links and information

### 🔐 Authentication

- User registration with email and password
- Secure login with JWT tokens
- Persistent authentication (localStorage)
- Secure logout functionality
- Password visibility toggle
- Form validation with error messages

### 🎵 Concert Management

- **Create**: Add new concert entries with artist, date, venue, city, genre, and personal notes
- **Read**: View all concerts in a responsive grid or on an interactive map
- **Update**: Edit existing concert entries and update ratings/notes
- **Delete**: Remove concert entries with confirmation
- Concert filtering by year and city
- Rating system (1-5 stars)
- Optional concert photo upload

### 📍 Interactive Map

- View all concerts on an interactive Leaflet map
- Click markers to see concert details
- Filter and search concert locations
- Responsive design for mobile and desktop

### 📊 Dashboard

- Comprehensive concert diary view
- Grid layout displaying concert cards
- Filter concerts by year and city
- Real-time updates when concerts are added/edited/deleted
- Empty state with helpful guidance
- Loading indicators during data fetch

### 🔔 User Feedback

- Toast notifications for success messages
- Toast notifications for error messages
- Toast notifications for warnings
- Loading spinner during async operations
- Error boundary for handling runtime errors
- Form validation feedback

### 📱 Responsive Design

- Mobile-first design approach
- Optimized for all screen sizes (mobile, tablet, desktop)
- Accessible navigation
- Touch-friendly interface

## 🧭 Architecture

The application follows a component-based architecture with clear separation of concerns:

### Directory Structure

```
src/
├── api/                           # API service layer
│   ├── authService.js            # Authentication endpoints
│   ├── journalService.js         # Journal entries CRUD
│   ├── concertService.js         # Concert data
│   └── client.js                 # Axios instance with interceptors
│
├── application/
│   └── Router.jsx                # Route configuration
│
├── components/
│   ├── auth/                     # Authentication components
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── common/                   # Reusable components
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── Toast.jsx
│   ├── concerts/                 # Concert management
│   │   ├── ConcertsDashboard.jsx
│   │   ├── ConcertCard.jsx
│   │   ├── ConcertFormModal.jsx
│   │   ├── ConcertsFilter.jsx
│   │   ├── ConcertsHeader.jsx
│   │   ├── FormField.jsx
│   │   └── RatingField.jsx
│   ├── layout/                   # Layout components
│   │   ├── Navbar.jsx
│   │   ├── SecondaryNav.jsx
│   │   └── Footer.jsx
│   ├── landing/                  # Landing page sections
│   │   ├── HeroSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── HowItWorksSection.jsx
│   │   └── CTASection.jsx
│   └── map/
│       └── MapDisplay.jsx        # Leaflet map component
│
├── context/                      # React Context
│   ├── AuthContext.jsx           # Authentication state
│   └── ToastContext.jsx          # Toast notifications
│
├── hooks/                        # Custom hooks
│   ├── useAuth.js               # Authentication hook
│   └── useToast.js              # Toast notifications hook
│
├── pages/                        # Page components
│   ├── Landing.jsx
│   ├── Map.jsx
│   └── Dashboard.jsx (via ConcertsDashboard)
│
├── styles/
│   ├── components/              # Component-scoped styles
│   │   ├── Auth.module.scss
│   │   ├── ConcertCard.module.scss
│   │   ├── ConcertsDashboard.module.scss
│   │   ├── ErrorBoundary.module.scss
│   │   ├── LoadingSpinner.module.scss
│   │   ├── Toast.module.scss
│   │   └── [other component styles...]
│   └── App.scss                 # Global styles
│
├── utils/                       # Utility functions
│   ├── validators.js            # Form validation functions
│   └── localStorage.js          # Local storage helpers
│
├── tests/                       # Test files
│   ├── validators.test.jsx
│   └── navigationFlow.integration.test.jsx
│
└── App.jsx                      # Root component
```

### Data Flow

1. **User Action** → Component event handler
2. **API Request** → Axios client (with JWT interceptor)
3. **Backend Response** → Context/State update
4. **Re-render** → Component displays new data
5. **User Feedback** → Toast notifications for success/error

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 10.x
- Backend server running on `http://localhost:8080`

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/DaniPacheco8/MyMusicJournal-FrontEnd.git
cd MyMusicJournal-FrontEnd
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `npm test -- --run` - Run tests in CI mode

## 🧪 Testing

The project includes comprehensive unit tests for validation functions:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## 🎨 Styling

The project uses SCSS modules for scoped styling with a modular structure:

- **Global Styles**: `src/styles/App.scss`
- **Component Styles**: `src/styles/components/*.module.scss`
- **Design Tokens**: Color palette, spacing, and typography defined in component stylesheets

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. **Registration**: User creates account with email and password
2. **Login**: User receives JWT token
3. **Token Storage**: Token persists in localStorage
4. **API Requests**: Token included in Authorization header
5. **Token Expiration**: Automatic redirect to login on 401 response
6. **Logout**: Token removed from localStorage

## 🚨 Error Handling

The application implements comprehensive error handling:

- **Error Boundary**: Catches React component errors
- **API Errors**: Handled with toast notifications
- **Form Validation**: Real-time validation with error messages
- **Network Errors**: User-friendly error messages
- **Server Errors**: Graceful error handling with retry options

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

## 📝 Git Workflow

The project uses feature branch workflow:

- `main` - Production-ready code
- `dev` - Development integration branch
- `feature/*` - Feature branches for new functionality
- `chore/*` - Maintenance and polish branches

## 📞 Support & Contact

For questions, issues, or suggestions:

| Developer            | Role                 | Contact                                                                                              |
| -------------------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| **Daniella Pacheco** | Full Stack Developer | [LinkedIn](https://www.linkedin.com/in/daniellapacheco/) • [GitHub](https://github.com/DaniPacheco8) |
