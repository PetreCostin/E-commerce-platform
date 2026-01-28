# E-Commerce Platform Backend

A secure, scalable e-commerce platform built with Spring Boot 3.2.1, PostgreSQL, and JWT authentication.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (USER, ADMIN)
- **Product Management**: CRUD operations with pagination and search
- **Category Management**: Organize products into categories
- **Shopping Cart**: Add, update, remove items from cart
- **Order Management**: Create orders from cart, track order status
- **User Management**: Admin can manage users and roles
- **Data Validation**: Input validation using Jakarta Validation
- **Exception Handling**: Global exception handler with custom error responses
- **Optimistic Locking**: Prevents race conditions in inventory management

## Technology Stack

- **Framework**: Spring Boot 3.2.1
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT (JJWT 0.12.3)
- **ORM**: Spring Data JPA / Hibernate
- **Java Version**: 17

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Products (Public Read, Admin Write)
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category
- `GET /api/products/search?name={name}` - Search products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Categories (Public Read, Admin Write)
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/{id}` - Update category (Admin only)
- `DELETE /api/categories/{id}` - Delete category (Admin only)

### Cart (Authenticated Users)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Authenticated Users)
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/all` - Get all orders (Admin only)
- `PUT /api/orders/{id}/status` - Update order status (Admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}/roles` - Update user roles

## Configuration

### Environment Variables

The application uses environment variables for sensitive configuration. Create these before running:

```bash
# Database Configuration
export DB_URL=jdbc:postgresql://localhost:5432/ecommerce_db
export DB_USERNAME=postgres
export DB_PASSWORD=your_secure_password

# JWT Configuration
export JWT_SECRET=your_256_bit_secret_key_here
export JWT_EXPIRATION=86400000

# CORS Configuration
export ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4200
```

### Default Configuration

If environment variables are not set, the application uses these defaults (suitable for development only):
- Database: `localhost:5432/ecommerce_db` with username `postgres` and password `postgres`
- JWT Secret: Default value (change in production!)
- JWT Expiration: 24 hours (86400000 ms)
- Allowed Origins: `http://localhost:3000,http://localhost:4200`

## Getting Started

### Prerequisites

- Java 17 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

### Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE ecommerce_db;
```

2. The application will automatically create tables on first run using Hibernate DDL auto-update.

### Running the Application

1. Clone the repository
2. Set environment variables (see Configuration section)
3. Navigate to the backend directory
4. Run the application:

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Default Admin Account

On first run, the application creates a default admin account:
- **Username**: `admin`
- **Password**: `admin123`
- **Roles**: ADMIN, USER

**⚠️ Important**: Change this password immediately in production!

### Sample Data

The application seeds the following on first run:
- Roles: ROLE_USER, ROLE_ADMIN
- Categories: Electronics, Clothing, Books, Home & Garden
- Sample products in each category

## Security Features

### Password Security
- Passwords are hashed using BCrypt
- Minimum password length: 6 characters
- Strong password recommendations apply

### JWT Authentication
- Tokens expire after 24 hours (configurable)
- Tokens are validated on each request
- Stateless session management

### Optimistic Locking
- Product entity uses `@Version` annotation
- Prevents race conditions during concurrent order creation
- Ensures inventory consistency

### Input Validation
- All DTOs use Jakarta Validation annotations
- Server-side validation for all inputs
- Custom error messages for validation failures

### CORS Configuration
- Configurable allowed origins
- Credentials support
- Limited to specific HTTP methods

## Building for Production

```bash
mvn clean package -DskipTests
```

The JAR file will be created in `target/platform-1.0.0.jar`

## Production Deployment Checklist

- [ ] Change default admin password
- [ ] Set strong JWT secret (minimum 256 bits)
- [ ] Configure production database credentials
- [ ] Set appropriate CORS allowed origins
- [ ] Enable HTTPS/TLS
- [ ] Configure proper logging levels
- [ ] Set up database backups
- [ ] Configure connection pooling
- [ ] Set up monitoring and alerting
- [ ] Review and harden security settings

## License

This project is licensed under the MIT License.
