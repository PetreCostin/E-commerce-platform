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

## 🚀 Run locally
```bash
docker-compose up --build
```
