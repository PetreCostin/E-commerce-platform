# E-Commerce Backend

Spring Boot REST API for the E-Commerce platform.

## Technologies

- **Java 17**
- **Spring Boot 3.3** – application framework
- **Spring Security** – JWT authentication filter, RBAC
- **Spring Data JPA** – database access layer
- **PostgreSQL** – relational database
- **jjwt 0.12** – JWT generation & validation
- **BCrypt (strength 12)** – password hashing
- **Maven** – build tool

## Features

- RESTful API design
- Real JWT authentication (generated on login, validated on every protected request)
- BCrypt password hashing
- Role-based access control (RBAC: `ROLE_USER`, `ROLE_ADMIN`)
- Input validation with Jakarta Bean Validation
- CORS configuration via environment variable
- PostgreSQL integration
- Docker support

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.9+
- PostgreSQL 14+ (or start via Docker Compose from the repo root)

### Database Setup

```bash
psql -U postgres -d ecommerce_db -f ../database/schema.sql
psql -U postgres -d ecommerce_db -f ../database/seeds.sql
```

### Configuration

`src/main/resources/application.properties` uses environment variable substitution with safe local defaults.
Override via environment variables or a `.env` file for Docker:

```properties
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key-at-least-32-chars
ALLOWED_ORIGINS=http://localhost:3000
```

### Run Application

```bash
cd backend
mvn spring-boot:run
```

API available at `http://localhost:8080`.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── config/          # SecurityConfig (filter chain, CORS, RBAC)
│   │   │   ├── controller/      # AuthController, ProductController, OrderController
│   │   │   ├── model/           # User, Product, Order, OrderItem entities
│   │   │   ├── repository/      # Spring Data JPA repositories
│   │   │   ├── security/        # JwtTokenProvider, JwtAuthenticationFilter
│   │   │   ├── service/         # UserService, ProductService, OrderService
│   │   │   └── EcommerceApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description                       |
|--------|----------------------|-----------------------------------|
| POST   | `/api/auth/register` | Register new user                 |
| POST   | `/api/auth/login`    | Login – returns JWT token         |
| GET    | `/api/auth/me`       | Get current authenticated user    |

### Products

| Method | Endpoint                          | Auth   | Description              |
|--------|-----------------------------------|--------|--------------------------|
| GET    | `/api/products`                   | Public | List all active products |
| GET    | `/api/products/{id}`              | Public | Get product by ID        |
| GET    | `/api/products/search?name=query` | Public | Search products by name  |
| GET    | `/api/products/category/{cat}`    | Public | Filter by category       |
| POST   | `/api/products`                   | Admin  | Create product           |
| PUT    | `/api/products/{id}`              | Admin  | Update product           |
| DELETE | `/api/products/{id}`              | Admin  | Delete product           |

### Orders

| Method | Endpoint                    | Auth  | Description                  |
|--------|-----------------------------|-------|------------------------------|
| GET    | `/api/orders`               | Admin | List all orders              |
| GET    | `/api/orders/my-orders`     | User  | Get current user's orders    |
| GET    | `/api/orders/{id}`          | User  | Get order by ID              |
| POST   | `/api/orders`               | User  | Create new order             |
| PATCH  | `/api/orders/{id}/cancel`   | User  | Cancel an order              |
| PATCH  | `/api/orders/{id}/status`   | Admin | Update order status          |

## Security

### JWT Authentication Flow

1. Client posts credentials to `POST /api/auth/login`
2. Server validates credentials via `DaoAuthenticationProvider`
3. `JwtTokenProvider` issues a signed JWT (HMAC-SHA256, configurable expiry)
4. Client stores the token and sends `Authorization: ****** on subsequent requests
5. `JwtAuthenticationFilter` (a `OncePerRequestFilter`) validates the token and populates the `SecurityContext`

### Password Security

- BCrypt with strength 12
- Plain-text passwords are never stored or logged

### Role-Based Access Control

| Role         | Permissions                                      |
|--------------|--------------------------------------------------|
| `ROLE_USER`  | Browse products, place/cancel own orders         |
| `ROLE_ADMIN` | All user permissions + manage products and orders|

### CORS

Origins are read from the `app.cors.allowed-origins` property (comma-separated). Set the `ALLOWED_ORIGINS` environment variable to change them.

## Testing

```bash
mvn test
```

## Docker

```bash
docker build -t ecommerce-backend .
docker run -p 8080:8080 \
  -e DB_HOST=postgres \
  -e DB_NAME=ecommerce_db \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e JWT_SECRET=your-secret \
  ecommerce-backend
```
