# E-Commerce Backend

Spring Boot REST API for the E-Commerce platform.

## Technologies

- **Java 17** - Programming language
- **Spring Boot 3.2** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database access
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **BCrypt** - Password hashing
- **Maven** - Build tool and dependency management

## Features

- RESTful API design
- JWT authentication
- BCrypt password hashing
- Role-based access control (RBAC)
- Input validation
- Exception handling
- CORS configuration
- PostgreSQL integration
- Docker support

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.9 or higher
- PostgreSQL 14 or higher

### Installation

```bash
mvn clean install
```

### Configuration

Update `src/main/resources/application.properties` or use environment variables:

```properties
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-secret-key-here

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

### Run Application

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access
│   │   │   ├── model/           # Entity classes
│   │   │   ├── config/          # Configuration
│   │   │   └── EcommerceApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/                    # Test classes
└── pom.xml                      # Maven configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Products

- `GET /api/products` - List all active products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?name={query}` - Search products
- `GET /api/products/category/{category}` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Orders

- `GET /api/orders` - List all orders (Admin only)
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/{id}/status` - Update order status (Admin only)
- `PATCH /api/orders/{id}/cancel` - Cancel order

## Security

### Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with credentials
2. Server validates and returns JWT token
3. Client includes token in Authorization header for subsequent requests
4. Server validates token for each protected endpoint

### Password Security

- Passwords are hashed using BCrypt (strength 12)
- Never store plain text passwords
- Password validation enforces minimum length

### Role-Based Access Control (RBAC)

Two roles are supported:
- `ROLE_USER` - Regular users (can browse products, place orders)
- `ROLE_ADMIN` - Administrators (full access including product management)

### CORS Configuration

CORS is configured to allow requests from the frontend application.

## Database

The application uses PostgreSQL for data persistence. Schema and seed data are in the `database/` directory.

### Initialize Database

```bash
createdb ecommerce_db
psql -U postgres -d ecommerce_db -f ../database/schema.sql
psql -U postgres -d ecommerce_db -f ../database/seeds.sql
```

## Testing

Run tests:

```bash
mvn test
```

## Docker

Build and run with Docker:

```bash
docker build -t ecommerce-backend .
docker run -p 8080:8080 \
  -e DB_HOST=postgres \
  -e DB_PORT=5432 \
  -e DB_NAME=ecommerce_db \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  ecommerce-backend
```

## Development

### Code Style

- Follow Java naming conventions
- Use meaningful variable and method names
- Add JavaDoc comments for public APIs
- Keep methods focused and concise

### Best Practices

- Use constructor injection for dependencies
- Validate input data
- Handle exceptions appropriately
- Write unit tests for business logic
- Use transactions for data modifications
