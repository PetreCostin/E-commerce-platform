# E-Commerce Platform

A secure, scalable full-stack e-commerce platform built with Spring Boot and React, designed to demonstrate real-world software engineering, security, and DevOps practices.

## 🎯 Features

### Users
- 🔐 Account registration & login (JWT authentication)
- 🛍️ Browse products with search and filtering
- 🛒 Shopping cart with quantity management
- 💳 Checkout and order placement
- 📦 Order history and tracking
- 👤 User profile management

### Admin
- 📦 Product & category management (CRUD operations)
- 📋 Order management with status updates
- 👥 User role control (RBAC)
- 📊 Dashboard with statistics

## 🏗 Architecture

- **Frontend**: React 18 with Vite
- **Backend**: Spring Boot 3.2 (Java 17)
- **Database**: PostgreSQL 15
- **Authentication**: JWT with BCrypt password hashing
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Web Server**: Nginx (for production frontend)

## 🔧 Technologies Used

### Backend
- Spring Boot 3.2.1
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL Driver
- Maven
- Java 17

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Context API for state management

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Nginx

## 📋 Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Maven 3.8 or higher
- Docker & Docker Compose
- PostgreSQL 15 (for local development without Docker)

## 🚀 Quick Start with Docker

The easiest way to run the entire application:

```bash
# Clone the repository
git clone https://github.com/PetreCostin/E-commerce-platform.git
cd E-commerce-platform

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up --build
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **PostgreSQL**: localhost:5432

### Default Admin Credentials
- **Username**: admin
- **Password**: admin123

⚠️ **Important**: Change the default admin password and JWT secret in production!

## 💻 Local Development Setup

### Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The frontend will start on http://localhost:5173

### Database Setup (without Docker)

```bash
# Install PostgreSQL
# Create database
createdb ecommerce

# Update backend/.env with your database credentials
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Product Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | List all products (paginated) | Public |
| GET | `/api/products/{id}` | Get product by ID | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/{id}` | Update product | Admin |
| DELETE | `/api/products/{id}` | Delete product | Admin |
| GET | `/api/products/search?keyword={keyword}` | Search products | Public |

### Category Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/categories` | List all categories | Public |
| GET | `/api/categories/{id}` | Get category by ID | Public |
| POST | `/api/categories` | Create category | Admin |
| PUT | `/api/categories/{id}` | Update category | Admin |
| DELETE | `/api/categories/{id}` | Delete category | Admin |

### Cart Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user's cart | Authenticated |
| POST | `/api/cart/items` | Add item to cart | Authenticated |
| PUT | `/api/cart/items/{id}` | Update cart item | Authenticated |
| DELETE | `/api/cart/items/{id}` | Remove cart item | Authenticated |
| DELETE | `/api/cart` | Clear cart | Authenticated |

### Order Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order from cart | Authenticated |
| GET | `/api/orders` | Get user's orders | Authenticated |
| GET | `/api/orders/{id}` | Get order by ID | Authenticated |
| GET | `/api/orders/admin/orders` | Get all orders | Admin |
| PUT | `/api/orders/{id}/status` | Update order status | Admin |

### User Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | List all users | Admin |
| PUT | `/api/users/{id}/roles` | Update user roles | Admin |

## 🔐 Security

### Application Security Features

✅ **Authentication & Authorization**
- JWT-based authentication with secure token generation
- BCrypt password hashing (strength 12)
- Role-based access control (RBAC)
- Stateless session management

✅ **Input Validation**
- Jakarta Bean Validation on all DTOs
- Custom validation for business rules
- SQL injection prevention via JPA

✅ **Security Headers**
- CORS configuration
- XSS protection
- Content type sniffing prevention

✅ **Additional Protections**
- Optimistic locking for inventory management
- Retry mechanism for concurrent updates
- Global exception handling

### Repository Security

This repository implements comprehensive security measures:
- 🤖 **Automated Dependency Scanning** - Dependabot monitors vulnerabilities
- 🔍 **Code Vulnerability Scanning** - CodeQL automatically scans code
- 🔒 **Secret Detection** - Prevents credential exposure
- 📋 **Security Policy** - Clear vulnerability reporting process

For security researchers: See [SECURITY.md](SECURITY.md)
For administrators: See [Security Setup Guide](.github/SECURITY_SETUP.md)

## 🧪 Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Build

```bash
cd frontend
npm run build
```

## 📦 Deployment

### Production Deployment with Docker

1. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Important production settings**:
   - Set a strong, random JWT_SECRET (256+ bits)
   - Use strong database credentials
   - Set appropriate CORS_ALLOWED_ORIGINS
   - Change default admin password immediately

3. **Build and deploy**:
   ```bash
   docker-compose up -d --build
   ```

4. **Verify deployment**:
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

### Environment Variables

#### Backend (.env or docker-compose)
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ecommerce
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=secure_password
JWT_SECRET=very-long-random-secret-key-256-bits-minimum
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

#### Frontend (.env)
```bash
VITE_API_URL=https://api.yourdomain.com/api
```

### Production Checklist

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET (256+ bits random)
- [ ] Use strong database credentials
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS/TLS
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Review and test security settings
- [ ] Set up rate limiting (recommended)
- [ ] Enable database connection pooling

## 🏗️ Project Structure

```
E-commerce-platform/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ecommerce/platform/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── model/            # JPA entities
│   │   │   │   ├── repository/       # Data repositories
│   │   │   │   ├── security/         # Security components
│   │   │   │   ├── service/          # Business logic
│   │   │   │   └── EcommercePlatformApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Tests
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── context/            # Context providers
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── codeql.yml
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational and demonstration purposes.

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check PostgreSQL is running
- Verify database credentials in .env
- Ensure port 8080 is not in use

**Frontend won't connect to backend**
- Verify backend is running on port 8080
- Check CORS configuration in backend
- Verify VITE_API_URL in frontend/.env

**Docker compose fails**
- Ensure Docker daemon is running
- Check port availability (3000, 8080, 5432)
- Try `docker-compose down -v` then rebuild

**Database connection errors**
- Wait for PostgreSQL to fully start (check healthcheck)
- Verify network connectivity between containers
- Check docker-compose logs: `docker-compose logs postgres`

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the security policy for security concerns

## ✨ Features Roadmap

- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Admin analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app