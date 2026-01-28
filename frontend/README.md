# E-Commerce Platform Frontend

A complete React-based frontend for the e-commerce platform built with Vite.

## Features

- User authentication (login/register)
- Product browsing with search and filtering
- Shopping cart management
- Order placement and tracking
- User profile management
- Admin dashboard with full CRUD operations for:
  - Products
  - Categories
  - Orders (status management)
  - Users (role management)

## Technology Stack

- React 19.2.0
- React Router DOM 7.x
- Axios for API calls
- Vite as build tool
- CSS for styling

## Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:8080

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional, defaults work with proxy):
```bash
cp .env.example .env
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at http://localhost:5173

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/       # Common UI components
│   ├── pages/            # Page components
│   ├── context/          # React Context providers
│   ├── services/         # API service layer
│   ├── utils/            # Utility functions and helpers
│   ├── App.jsx           # Main app component with routes
│   └── main.jsx          # Application entry point
├── public/               # Static assets
└── package.json
```

## API Integration

The frontend communicates with the backend API through axios. All requests are automatically proxied to `http://localhost:8080` in development mode.

### Authentication
JWT tokens are stored in localStorage and automatically attached to requests via axios interceptors.

## Routes

### Public Routes
- `/` - Home page with product listing
- `/login` - Login page
- `/register` - Registration page
- `/products/:id` - Product detail page

### Protected Routes (Require Authentication)
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/orders` - Order history
- `/orders/:id` - Order details
- `/profile` - User profile

### Admin Routes (Require ADMIN Role)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/users` - User management

## Security

- JWT token-based authentication
- Protected routes redirect to login
- Admin routes check for ADMIN role
- Automatic logout on 401 responses

## Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices.
