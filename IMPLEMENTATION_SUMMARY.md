# Implementation Summary

## Overview

This document summarises the delivered implementation of the E-Commerce Platform and records the changes made to bring code, configuration, and documentation into a consistent state.

---

## Delivered Features

### Frontend (React 18 + Vite 5)

| Feature | Status |
|---|---|
| User login (real JWT from backend) | ✅ |
| User registration | ✅ |
| Product catalog (fetched from backend) | ✅ |
| Product search / filter | ✅ |
| Shopping cart (quantity management) | ✅ |
| Checkout (creates order on backend) | ✅ |
| Order history | ✅ |
| Order cancellation | ✅ |
| Protected routes (redirect to login) | ✅ |
| Automatic 401 → login redirect | ✅ |
| Logout | ✅ |

### Backend (Spring Boot 3.3 + Java 17)

| Feature | Status |
|---|---|
| Real JWT generation on login (jjwt 0.12) | ✅ |
| JWT validation filter (`JwtAuthenticationFilter`) | ✅ |
| BCrypt password hashing (strength 12) | ✅ |
| User registration with duplicate checks | ✅ |
| RBAC (`ROLE_USER`, `ROLE_ADMIN`) | ✅ |
| Product CRUD (Admin-only writes) | ✅ |
| Order creation / cancellation | ✅ |
| Order history per user | ✅ |
| Admin order status updates | ✅ |
| JSON serialization safe (no lazy-load recursion) | ✅ |
| CORS driven by environment variable | ✅ |

### Database (PostgreSQL 16)

| Feature | Status |
|---|---|
| Schema defined in `database/schema.sql` | ✅ |
| Seed data in `database/seeds.sql` | ✅ |
| Auto-loaded by Docker Compose | ✅ |
| `ddl-auto=validate` (Hibernate validates against existing schema) | ✅ |

---

## Key Changes Made

### 1. Spring Boot Version

`pom.xml` declared `spring-boot-starter-parent 4.1.0` which does not exist. Updated to **3.3.5** (a current stable release). All documentation updated from the incorrect "3.2" claim to "3.3".

### 2. Real JWT Implementation

- Created `com.ecommerce.security.JwtTokenProvider` – generates and validates HMAC-SHA256 signed tokens using the `jwt.secret` property.
- Created `com.ecommerce.security.JwtAuthenticationFilter` – a `OncePerRequestFilter` that extracts the `Authorization: ****** header, validates the token, and populates the `SecurityContext`.
- Updated `SecurityConfig` to inject and register the filter via `addFilterBefore(...)`.
- Updated `AuthController.login(...)` to call `jwtTokenProvider.generateToken(authentication)` instead of returning `"mock-jwt-token"`.

### 3. Frontend – Real API Calls

- Added `src/api/index.js` – an Axios instance with a request interceptor (attaches JWT) and response interceptor (redirects on 401).
- `Login.jsx` – replaced mock logic with a real `POST /api/auth/login` call.
- `Products.jsx` – replaced hard-coded mock data with a real `GET /api/products` call. Added stock-aware "Add to Cart" / "Out of Stock" UI.

### 4. New Frontend Components

- `Register.jsx` – registration form calling `POST /api/auth/register`.
- `Orders.jsx` – order history via `GET /api/orders/my-orders`; cancel button for PENDING orders.
- `Cart.jsx` – cart state, quantity controls, and checkout form that calls `POST /api/orders`.

### 5. Application Configuration

- `spring.jpa.hibernate.ddl-auto` changed from `update` to `validate`. The schema is managed by `database/schema.sql`; Hibernate should only validate, not auto-mutate.
- Security logging reduced from `DEBUG` to `WARN` to avoid flooding logs in normal operation.

### 6. CORS

Removed hard-coded origin lists from `SecurityConfig`; origins are now read from the `app.cors.allowed-origins` property (backed by the `ALLOWED_ORIGINS` environment variable).

### 7. Docker Compose

- `JWT_SECRET` changed from a hard-coded string to `${JWT_SECRET:-changeme-use-a-strong-secret-in-production-min32chars}` so it can be overridden without editing the file.
- `DB_PASSWORD` parameterised similarly.
- Added inline comment warning about changing the secret for production.

### 8. CI/CD (`ci-cd.yml`)

- Removed `|| true` from `npm run lint` and `mvn test` – failures now correctly fail the workflow.
- Combined Maven build+test into `mvn clean verify` for the backend job (previously `mvn clean package -DskipTests` + separate `mvn test || true`).
- Fixed `cache-dependency-path` to `frontend/package-lock.json` (the lock file now exists).

### 9. Documentation

- `README.md` – corrected Spring Boot version, removed "Flyway/Liquibase ready" claim (no migration tool is configured), documented actual env variables, added frontend test note.
- `backend/README.md` – corrected Spring Boot version, documented JWT flow, updated project structure.
- `frontend/README.md` – documented all real components and API usage.
- `SECURITY.md` – replaced incorrect "CSRF protection for state-changing ops" claim with accurate explanation of why CSRF is intentionally disabled for this stateless JWT API.

---

## Known Limitations / Deferred Items

| Item | Notes |
|---|---|
| Frontend unit/e2e tests | No test suite exists; `npm test` is not configured. README documents this. CI runs only lint + build. |
| Database migrations (Flyway/Liquibase) | Not configured. Schema is managed via `database/schema.sql`. The "Flyway/Liquibase ready" claim has been removed from docs. |
| Admin UI | Admin operations (product create/update/delete, order status) are backend-only; no admin frontend pages are implemented. |
| Token refresh | JWT tokens expire after 24 h (configurable via `jwt.expiration`). No refresh-token flow is implemented. |
| HTTPS / TLS | Not configured at the application level; add a reverse proxy (nginx / Traefik) with TLS termination for production. |
