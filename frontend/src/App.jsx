import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import Login from './components/Login'
import Register from './components/Register'
import Orders from './components/Orders'
import Cart from './components/Cart'
import './App.css'

/**
 * Main App component – entry point for the E-commerce platform.
 * Manages authentication state, cart state, and top-level routing.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
    setUser(null)
    setCartItems([])
  }

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">E-Commerce</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li>
                <Link to="/cart">
                  Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li><Link to="/orders">My Orders</Link></li>
                  <li><span className="nav-user">Welcome, {user?.username || 'User'}</span></li>
                  <li><button className="nav-logout" onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                )
              }
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
            />
            <Route
              path="/orders"
              element={
                isAuthenticated ? <Orders /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 E-Commerce Platform. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
