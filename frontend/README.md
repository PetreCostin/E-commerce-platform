# E-Commerce Frontend

React-based frontend for the E-Commerce platform built with Vite.

## Technologies

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## Features

- User authentication with JWT tokens
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   └── Login.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── App.css         # Styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## API Integration

The frontend communicates with the Spring Boot backend API running on port 8080.

API endpoints:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Create an order
- `GET /api/orders/my-orders` - Get user's orders

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=http://localhost:8080/api
```

## Docker

Build and run with Docker:

```bash
docker build -t ecommerce-frontend .
docker run -p 80:80 ecommerce-frontend
```

## Security

- JWT tokens stored in localStorage
- CORS configured for backend communication
- Input validation on forms
- Protected routes for authenticated users
