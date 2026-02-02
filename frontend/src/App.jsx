import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Products from './components/Products'
import Login from './components/Login'
import './App.css'

/**
 * Main App component - Entry point for the E-commerce platform
 * Handles routing and global state management
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for existing JWT token in localStorage
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setIsAuthenticated(true)
      // In production, validate token with backend
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">E-Commerce</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              {isAuthenticated ? (
                <>
                  <li><span>Welcome, {user?.username || 'User'}</span></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} 
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
