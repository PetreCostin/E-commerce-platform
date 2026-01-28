# E-Commerce Platform - Deployment Guide

## Quick Start

### Option 1: Docker Compose (Recommended)

The easiest way to run the entire application stack:

```bash
# 1. Clone the repository
git clone https://github.com/PetreCostin/E-commerce-platform.git
cd E-commerce-platform

# 2. Copy and configure environment variables
cp .env.example .env
# Edit .env with your configuration (optional for local development)

# 3. Build and start all services
docker compose up --build

# Wait for all services to start (may take 2-3 minutes on first build)
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- PostgreSQL: localhost:5432

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Security**: Change the default admin password immediately after first login!

### Option 2: Local Development

Run backend and frontend separately for development:

#### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- PostgreSQL 15+

#### Step 1: Setup PostgreSQL

```bash
# Create database
createdb ecommerce

# Or using psql
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

#### Step 2: Start Backend

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
# SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce
# SPRING_DATASOURCE_USERNAME=your_username
# SPRING_DATASOURCE_PASSWORD=your_password

# Build and run
mvn clean install
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

#### Step 3: Start Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables (already configured for local development)
cp .env.example .env

# Start development server
npm run dev

# Frontend will start on http://localhost:5173
```

## Configuration

### Environment Variables

#### Root .env (for Docker Compose)

```bash
# Database
POSTGRES_DB=ecommerce
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

# Backend
BACKEND_PORT=8080
JWT_SECRET=change-this-to-a-very-long-random-string-at-least-256-bits
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost

# Frontend
FRONTEND_PORT=3000
```

#### Backend .env

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ecommerce
SPRING_DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=change-this-to-a-very-long-random-string-at-least-256-bits
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### Frontend .env

```bash
VITE_API_URL=http://localhost:8080/api
```

## Production Deployment

### Security Checklist

Before deploying to production:

- [ ] Generate a strong JWT secret (256+ bits, random)
- [ ] Use strong database credentials
- [ ] Change default admin password
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS/TLS
- [ ] Set up database backups
- [ ] Configure production logging
- [ ] Review security headers
- [ ] Set up monitoring and alerts
- [ ] Enable rate limiting (optional but recommended)

### Production Configuration

1. **Generate JWT Secret**:
   ```bash
   # Generate a secure random key
   openssl rand -base64 64
   ```

2. **Update Production Environment**:
   ```bash
   # Use strong credentials
   POSTGRES_PASSWORD=<very-strong-password>
   JWT_SECRET=<generated-secret-from-step-1>
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   ```

3. **Deploy with Docker Compose**:
   ```bash
   # Production build
   docker compose -f docker-compose.yml up -d --build

   # View logs
   docker compose logs -f

   # Check status
   docker compose ps
   ```

### Nginx Reverse Proxy (Production)

For production, use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Testing

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

### Manual Testing

1. **Register a new user**: Visit http://localhost:3000/register
2. **Login**: Use the credentials to login
3. **Browse products**: View the product catalog
4. **Add to cart**: Add items to shopping cart
5. **Checkout**: Complete an order
6. **Admin access**: Login as admin to access admin features

## Troubleshooting

### Backend Issues

**Port already in use**:
```bash
# Find process using port 8080
lsof -i :8080
# Kill the process
kill -9 <PID>
```

**Database connection error**:
- Verify PostgreSQL is running
- Check database credentials
- Ensure database exists
- Check firewall settings

**JWT token errors**:
- Ensure JWT_SECRET is set
- Check token expiration time
- Verify Authorization header format

### Frontend Issues

**API connection error**:
- Verify backend is running
- Check VITE_API_URL in .env
- Verify CORS configuration in backend

**Build errors**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

**Container won't start**:
```bash
# View logs
docker compose logs backend
docker compose logs frontend
docker compose logs postgres

# Restart specific service
docker compose restart backend
```

**Port conflicts**:
```bash
# Check what's using the port
lsof -i :3000
lsof -i :8080
lsof -i :5432

# Stop all containers and remove volumes
docker compose down -v
```

**Database initialization**:
```bash
# If database is in bad state, remove volume and restart
docker compose down -v
docker compose up --build
```

## Monitoring

### Health Checks

- Backend health: http://localhost:8080/api/products
- Frontend health: http://localhost:3000
- Database: Use `docker compose ps` to check postgres health

### Logs

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres

# Save logs to file
docker compose logs > logs.txt
```

## Database Management

### Backup

```bash
# Backup database
docker compose exec postgres pg_dump -U user ecommerce > backup.sql

# Or from host
pg_dump -h localhost -U user ecommerce > backup.sql
```

### Restore

```bash
# Restore from backup
docker compose exec -T postgres psql -U user ecommerce < backup.sql

# Or from host
psql -h localhost -U user ecommerce < backup.sql
```

### Connect to Database

```bash
# Connect via Docker
docker compose exec postgres psql -U user -d ecommerce

# Or from host
psql -h localhost -U user -d ecommerce
```

## Scaling

### Horizontal Scaling

To scale the backend:

```yaml
# docker-compose.yml
services:
  backend:
    deploy:
      replicas: 3
```

Add a load balancer (Nginx/HAProxy) in front of backend instances.

### Database Optimization

For production workloads:
- Enable connection pooling (already configured)
- Add database indexes for frequently queried fields
- Set up read replicas for read-heavy workloads
- Regular database maintenance (VACUUM, ANALYZE)

## Maintenance

### Update Dependencies

**Backend**:
```bash
cd backend
mvn versions:display-dependency-updates
# Update versions in pom.xml
mvn clean install
```

**Frontend**:
```bash
cd frontend
npm outdated
npm update
# Or update specific package
npm install package@latest
```

### Security Updates

- Monitor Dependabot alerts
- Review CodeQL scan results
- Keep base Docker images updated
- Regularly review security logs

## Support

For issues:
- Check logs first
- Review this guide
- Search existing GitHub issues
- Open a new issue with details

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
