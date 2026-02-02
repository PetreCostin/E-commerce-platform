# E-Commerce Platform

A secure, scalable full-stack e-commerce platform built with Spring Boot and React, designed to demonstrate real-world software engineering, security, and DevOps practices.

## 🎯 Features
### Users
- Account registration & login (JWT)
- Browse products
- Shopping cart & checkout
- Order history

### Admin
- Product & category management
- Order management
- User role control (RBAC)

## 🏗 Architecture
- Frontend: React (Vite)
- Backend: Java Spring Boot (REST API)
- Database: PostgreSQL
- Authentication: JWT
- DevOps: Docker & GitHub Actions

## 🔧 Technologies Used

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Java 17** - Enterprise-grade programming language
- **Spring Boot 3.2** - Production-ready framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database abstraction
- **JWT (JSON Web Tokens)** - Stateless authentication

### Database
- **PostgreSQL 16** - Powerful relational database
- **Flyway/Liquibase ready** - Database migrations

### Security
- **BCrypt** - Password hashing (strength 12)
- **JWT** - Token-based authentication
- **RBAC** - Role-based access control
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD automation
- **Maven** - Java build automation
- **npm** - JavaScript package management

## 🔐 Security

### Application Security
- Password hashing (BCrypt)
- JWT authentication & authorization
- Input validation
- Role-based access control

### Repository Security
This repository implements comprehensive security measures:
- 🤖 **Automated Dependency Scanning** - Dependabot monitors vulnerabilities across npm, Maven, Docker, and GitHub Actions
- 🔍 **Code Vulnerability Scanning** - CodeQL automatically scans for security issues in Java and JavaScript code
- 🔒 **Secret Detection** - Prevents accidental exposure of API keys and credentials
- 📋 **Security Policy** - Clear process for responsible vulnerability disclosure

For security researchers: See [SECURITY.md](SECURITY.md) for our vulnerability reporting process.

For administrators: See [Security Setup Guide](.github/SECURITY_SETUP.md) for configuration instructions.

## 📁 Project Structure

```
E-commerce-platform/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # npm dependencies
│   ├── vite.config.js       # Vite configuration
│   └── Dockerfile           # Frontend container
├── backend/                  # Spring Boot backend
│   ├── src/main/java/com/ecommerce/
│   │   ├── controller/      # REST API controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access layer
│   │   ├── model/           # JPA entities
│   │   ├── config/          # Security & app config
│   │   └── EcommerceApplication.java
│   ├── pom.xml              # Maven dependencies
│   └── Dockerfile           # Backend container
├── database/                 # PostgreSQL scripts
│   ├── schema.sql           # Database schema
│   └── seeds.sql            # Sample data
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml        # CI/CD pipeline
│   │   └── codeql.yml       # Security scanning
│   └── dependabot.yml       # Dependency updates
└── docker-compose.yml        # Local development setup
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Java 17+ (for local backend development)
- Node.js 18+ (for local frontend development)
- PostgreSQL 14+ (if not using Docker)

### Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/PetreCostin/E-commerce-platform.git
cd E-commerce-platform

# Start all services (frontend, backend, database)
docker-compose up --build
```

Access the application:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432

### Run Locally (Development)

#### 1. Start PostgreSQL
```bash
# Using Docker
docker run -d \
  --name postgres \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine

# Initialize database
psql -U postgres -d ecommerce_db -f database/schema.sql
psql -U postgres -d ecommerce_db -f database/seeds.sql
```

#### 2. Start Backend
```bash
cd backend
mvn spring-boot:run
```

Backend will run at http://localhost:8080

#### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run at http://localhost:3000

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user info |

### Product Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/{id}` | Public | Get product details |
| GET | `/api/products/search?name={query}` | Public | Search products |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/{id}` | Admin | Update product |
| DELETE | `/api/products/{id}` | Admin | Delete product |

### Order Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/orders` | Admin | List all orders |
| GET | `/api/orders/my-orders` | User | Get user's orders |
| POST | `/api/orders` | User | Create order |
| PATCH | `/api/orders/{id}/cancel` | User | Cancel order |

## 🔒 Default Credentials

For testing purposes (change in production):

```
Admin:
  Username: admin
  Password: password123

Regular User:
  Username: john_doe
  Password: password123
```

## 🛠 Development

### Frontend Development
See [frontend/README.md](frontend/README.md) for detailed frontend documentation.

### Backend Development
See [backend/README.md](backend/README.md) for detailed backend documentation.

### Database
See [database/README.md](database/README.md) for database schema and migration documentation.

## 🚢 Deployment

### Build Docker Images
```bash
# Frontend
docker build -t ecommerce-frontend ./frontend

# Backend
docker build -t ecommerce-backend ./backend
```

### Environment Variables

#### Backend
```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=https://yourdomain.com
```

#### Frontend
```env
VITE_API_URL=https://api.yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.