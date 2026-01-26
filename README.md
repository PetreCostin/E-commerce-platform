# E-Commerce Platform

A secure, scalable full-stack e-commerce platform built with Vue.js, Express.js, Node.js, and MongoDB, designed to demonstrate real-world software engineering, security, and DevOps practices.

## 🎯 Features

### Customer Features
- User registration & login with JWT authentication
- Browse products with search and pagination
- Shopping cart with persistent storage
- Secure checkout process
- Order history and tracking
- User profile management
- PayPal payment integration

### Admin Features
- Product management (CRUD operations)
- Order management and status updates
- Inventory tracking
- User role control (RBAC)

## 🏗 Architecture

### Frontend
- **Framework**: Vue.js 3
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt
- **Payment Gateway**: PayPal SDK

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Web Server**: Nginx (for frontend production)

## 🔐 Security Features

- Password hashing with BCrypt (10 rounds)
- JWT-based authentication and authorization
- Role-based access control (RBAC)
- HTTP-only secure session management
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB 7.0 or higher
- Docker and Docker Compose (optional)

### Installation

#### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/PetreCostin/E-commerce-platform.git
cd E-commerce-platform

# Start all services with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:8080
# Backend API: http://localhost:5000
# MongoDB: mongodb://localhost:27017
```

#### Option 2: Manual Setup

**Backend Setup:**
```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your configuration
# - Set MongoDB URI
# - Set JWT secret
# - Set PayPal credentials

# Start the backend server
npm run dev
```

**Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm run dev
```

**MongoDB Setup:**
```bash
# Make sure MongoDB is running
# Default connection: mongodb://localhost:27017/ecommerce
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://mongodb:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
FRONTEND_URL=http://localhost:8080
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
E-commerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth & error middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (PayPal, Inventory)
│   │   └── server.js        # Express app entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/           # Page components
│   │   ├── stores/          # Pinia stores
│   │   ├── services/        # API services
│   │   ├── router/          # Vue Router config
│   │   └── App.vue          # Root component
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── .github/
│   └── workflows/           # CI/CD pipelines
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with pagination & search)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Payment
- `POST /api/payment/paypal/create` - Create PayPal order (protected)
- `POST /api/payment/paypal/capture/:orderId` - Capture payment (protected)
- `GET /api/payment/paypal/config` - Get PayPal client ID

### Inventory (Mock Service)
- `GET /api/inventory/check/:productId` - Check availability (protected)
- `POST /api/inventory/reserve` - Reserve inventory (protected)
- `GET /api/inventory/status/:productId` - Get inventory status (admin)
- `PUT /api/inventory/update` - Update inventory (admin)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Build output will be in dist/
```

### Docker Production Build
```bash
docker-compose -f docker-compose.yml up --build
```

## 🚢 Deployment

The application includes GitHub Actions workflows for:
- Continuous Integration (CI): Automated testing and building
- Continuous Deployment (CD): Automated deployment to production

Workflows are triggered on push to main/develop branches.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

PetreCostin

## 🙏 Acknowledgments

- Vue.js team for the amazing frontend framework
- Express.js for the robust backend framework
- MongoDB for the flexible database
- PayPal for payment integration SDK
