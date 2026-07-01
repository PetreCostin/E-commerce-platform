# E-Commerce Platform

A full-stack e-commerce platform built with Spring Boot and React, demonstrating real-world software engineering, security, and DevOps practices.

## 🎯 Features

### Users
- Account registration & login (JWT)
- Browse products with search/filter
- Shopping cart & checkout
- Order history & cancellation

### Admin
- Product management (create, update, delete)
- Order management & status updates
- Role-based access control (RBAC)

## 🏗 Architecture

- **Frontend**: React 18 + Vite (SPA, client-side routing)
- **Backend**: Java 17 + Spring Boot 3.3 REST API
- **Database**: PostgreSQL 16
- **Authentication**: JWT (stateless, stored in `localStorage`)
- **DevOps**: Docker, Docker Compose, GitHub Actions

## 🔧 Technologies

### Frontend
- **React 18** – hooks-based UI
- **Vite 5** – fast build/dev server with proxy to backend
- **React Router 6** – client-side routing with protected routes
- **Axios** – HTTP client with JWT interceptor

### Backend
- **Java 17** – language
- **Spring Boot 3.3** – framework
- **Spring Security** – JWT authentication filter, RBAC
- **Spring Data JPA** – database access
- **jjwt 0.12** – JWT generation & validation
- **BCrypt (strength 12)** – password hashing

### Database
- **PostgreSQL 16**
- Schema + seed data in `database/` (loaded by Docker Compose automatically)
- `ddl-auto=validate` – schema is managed via `database/schema.sql`, not auto-updated by Hibernate

### Security
- BCrypt password hashing
- JWT tokens in `Authorization: Bearer` header
- CSRF disabled (stateless API; JWT header is inherently CSRF-safe)
- RBAC with `ROLE_USER` / `ROLE_ADMIN`
- CORS configured via `app.cors.allowed-origins` property

### DevOps
- Docker & Docker Compose for local development
- Multi-stage Dockerfiles (build + runtime)
- GitHub Actions CI/CD (build, lint, test, Docker image)
- CodeQL security scanning
- Dependabot dependency updates

## 📁 Project Structure

```
E-commerce-platform/
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── api/             # Axios client with JWT interceptor
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Routing & global state
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   ├── vite.config.js       # Dev proxy → localhost:8080
│   └── Dockerfile
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/ecommerce/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # JPA repositories
│   │   ├── model/           # JPA entities
│   │   ├── config/          # Security & Spring config
│   │   └── security/        # JWT provider & filter
│   ├── pom.xml
│   └── Dockerfile
├── database/
│   ├── schema.sql           # DDL – tables, indexes, triggers
│   └── seeds.sql            # Sample data (admin + user accounts)
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml        # CI/CD pipeline
│   │   └── codeql.yml       # Security scanning
│   └── dependabot.yml
└── docker-compose.yml
```

## 🚀 Quick Start

### Run with Docker Compose (Recommended)

```bash
git clone https://github.com/PetreCostin/E-commerce-platform.git
cd E-commerce-platform

# Optionally create a .env file to override defaults:
# JWT_SECRET=<your-strong-secret>
# DB_PASSWORD=<your-db-password>

docker-compose up --build
```

| Service   | URL                       |
|-----------|---------------------------|
| Frontend  | http://localhost          |
| Backend   | http://localhost:8080     |
| Database  | localhost:5432            |

### Run Locally (Development)

#### 1. Start PostgreSQL

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine

psql -U postgres -d ecommerce_db -f database/schema.sql
psql -U postgres -d ecommerce_db -f database/seeds.sql
```

#### 2. Start Backend

```bash
cd backend
# Set environment variables or rely on defaults in application.properties
mvn spring-boot:run
```

API available at `http://localhost:8080`

#### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend at `http://localhost:3000` (proxies `/api/*` to the backend).

## 🧪 Testing

### Backend

```bash
cd backend
mvn test
```

### Frontend

The frontend does not currently include a test suite. The `npm run lint` script performs static analysis.

## 📚 API Reference

### Authentication

| Method | Endpoint              | Auth   | Description                    |
|--------|-----------------------|--------|--------------------------------|
| POST   | `/api/auth/register`  | Public | Register new user              |
| POST   | `/api/auth/login`     | Public | Login – returns JWT token      |
| GET    | `/api/auth/me`        | User   | Get current user info          |

### Products

| Method | Endpoint                          | Auth   | Description             |
|--------|-----------------------------------|--------|-------------------------|
| GET    | `/api/products`                   | Public | List all active products|
| GET    | `/api/products/{id}`              | Public | Get product by ID       |
| GET    | `/api/products/search?name=query` | Public | Search products by name |
| GET    | `/api/products/category/{cat}`    | Public | Filter by category      |
| POST   | `/api/products`                   | Admin  | Create product          |
| PUT    | `/api/products/{id}`              | Admin  | Update product          |
| DELETE | `/api/products/{id}`              | Admin  | Delete product          |

### Orders

| Method | Endpoint                    | Auth  | Description               |
|--------|-----------------------------|-------|---------------------------|
| GET    | `/api/orders`               | Admin | List all orders           |
| GET    | `/api/orders/my-orders`     | User  | Get current user's orders |
| GET    | `/api/orders/{id}`          | User  | Get order by ID           |
| POST   | `/api/orders`               | User  | Create new order          |
| PATCH  | `/api/orders/{id}/cancel`   | User  | Cancel an order           |
| PATCH  | `/api/orders/{id}/status`   | Admin | Update order status       |

## 🔒 Default Credentials (seed data)

> **Change these before deploying to any shared or production environment.**

| Role  | Username   | Password     |
|-------|------------|--------------|
| Admin | `admin`    | `password123`|
| User  | `john_doe` | `password123`|

## 🌍 Environment Variables

### Backend

| Variable           | Default                               | Description              |
|--------------------|---------------------------------------|--------------------------|
| `DB_HOST`          | `localhost`                           | PostgreSQL host          |
| `DB_PORT`          | `5432`                                | PostgreSQL port          |
| `DB_NAME`          | `ecommerce_db`                        | Database name            |
| `DB_USERNAME`      | `postgres`                            | Database user            |
| `DB_PASSWORD`      | `postgres`                            | Database password        |
| `JWT_SECRET`       | *(see application.properties)*        | **Change in production** |
| `ALLOWED_ORIGINS`  | `http://localhost:3000,...`           | CORS allowed origins     |

### Frontend

| Variable       | Default | Description                 |
|----------------|---------|-----------------------------|
| `VITE_API_URL` | `/api`  | Backend API base URL        |

## 🚢 Deployment

```bash
# Build images
docker build -t ecommerce-frontend ./frontend
docker build -t ecommerce-backend ./backend

# Or use Docker Compose
JWT_SECRET=<strong-secret> DB_PASSWORD=<strong-password> docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## 📄 License

MIT License
