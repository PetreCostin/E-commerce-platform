import React, { useState } from 'react'
import axios from 'axios'

/**
 * Login component - User authentication
 * Handles JWT token authentication with backend
 */
function Login({ setIsAuthenticated, setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // In production, this would call the backend authentication API
      // const response = await axios.post('/api/auth/login', formData)
      // localStorage.setItem('jwtToken', response.data.token)
      // setIsAuthenticated(true)
      // setUser(response.data.user)

      // Mock authentication for demonstration
      if (formData.username && formData.password) {
        const mockToken = 'mock-jwt-token-' + Date.now()
        localStorage.setItem('jwtToken', mockToken)
        setIsAuthenticated(true)
        setUser({ username: formData.username })
        window.location.href = '/'
      } else {
        setError('Please enter both username and password')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default Login
