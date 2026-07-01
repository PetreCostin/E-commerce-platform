# E-Commerce Frontend

React SPA for the E-Commerce platform, built with Vite.

## Technologies

- **React 18** – hooks-based UI
- **Vite 5** – fast build tool and dev server
- **React Router 6** – client-side routing
- **Axios** – HTTP client with JWT interceptor

## Features

- User registration and login (JWT)
- Product catalog with live search and filtering
- Shopping cart with quantity management
- Checkout flow (creates an order on the backend)
- Order history with cancellation
- Protected routes (orders require authentication)
- Automatic redirect to login on `401` responses

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

App available at `http://localhost:3000`. Vite proxies `/api/*` to `http://localhost:8080` so the backend can run separately.

### Lint

```bash
npm run lint
```

### Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── index.js        # Axios instance with JWT auth interceptor
│   ├── components/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login form (real backend call)
│   │   ├── Register.jsx     # Registration form
│   │   ├── Products.jsx     # Product catalog (backend API)
│   │   ├── Cart.jsx         # Shopping cart & checkout
│   │   └── Orders.jsx       # Order history
│   ├── App.jsx              # Routing, auth state, cart state
│   ├── App.css              # Global styles
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## API Integration

The frontend communicates with the Spring Boot backend.

During development the Vite dev server proxies `/api` to `http://localhost:8080` (configured in `vite.config.js`). In production (Docker), nginx serves the static build and the same `/api` prefix is proxied to the backend container.

Key endpoints used:

| Endpoint                  | Usage                         |
|---------------------------|-------------------------------|
| `POST /api/auth/login`    | Login                         |
| `POST /api/auth/register` | Registration                  |
| `GET  /api/products`      | Product listing               |
| `POST /api/orders`        | Checkout                      |
| `GET  /api/orders/my-orders` | Order history              |
| `PATCH /api/orders/{id}/cancel` | Cancel order            |

## Environment Variables

Create a `.env` file to override the API base URL (optional – the Vite proxy handles local development automatically):

```env
VITE_API_URL=https://api.yourdomain.com/api
```

## Docker

```bash
docker build -t ecommerce-frontend .
docker run -p 80:80 ecommerce-frontend
```

## Security Notes

- JWT tokens are stored in `localStorage` and attached to all API requests via an Axios request interceptor.
- On a `401` response the interceptor clears the token and redirects to `/login`.
- Input fields have `autoComplete` attributes set for browser credential management support.
