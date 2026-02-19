# E-Commerce Platform Database

This directory contains PostgreSQL database scripts for the E-commerce platform.

## Files

### schema.sql
Database schema definition including:
- **Tables**: users, user_roles, products, orders, order_items
- **Constraints**: Primary keys, foreign keys, check constraints
- **Indexes**: For optimized query performance
- **Triggers**: Automatic timestamp updates
- **Security**: BCrypt password hashing, role-based access control

### seeds.sql
Sample data for development and testing:
- Sample users with different roles (admin and regular users)
- Product catalog across multiple categories
- Sample orders with different statuses
- Order items and inventory updates

## Usage

### Initialize Database
```bash
psql -U postgres -d ecommerce_db -f schema.sql
```

### Load Sample Data
```bash
psql -U postgres -d ecommerce_db -f seeds.sql
```

### Create Database
```bash
createdb -U postgres ecommerce_db
```

### Complete Setup
```bash
createdb -U postgres ecommerce_db
psql -U postgres -d ecommerce_db -f schema.sql
psql -U postgres -d ecommerce_db -f seeds.sql
```

## Database Schema

### Users Table
- Stores user accounts with BCrypt hashed passwords
- Email and username uniqueness enforced
- Tracks account creation and updates

### User Roles Table
- Implements role-based access control (RBAC)
- Supports multiple roles per user
- Available roles: ROLE_USER, ROLE_ADMIN

### Products Table
- Product catalog with inventory management
- Category-based organization
- Price and stock tracking
- Soft delete via is_active flag

### Orders Table
- Customer order tracking
- Order status workflow: PENDING → PROCESSING → SHIPPED → DELIVERED
- Can be CANCELLED at any stage

### Order Items Table
- Line items for each order
- Links products to orders
- Captures quantity and price at time of order

## Security Notes

- All passwords are stored using BCrypt hashing
- Never store passwords in plain text
- Use environment variables for database credentials
- Regular backups recommended for production

## Sample Credentials

For testing purposes (DO NOT USE IN PRODUCTION):
- Username: admin, Password: password123
- Username: john_doe, Password: password123
- Username: jane_smith, Password: password123
- Username: bob_wilson, Password: password123
