import React from 'react'

/**
 * Home component - Landing page for the E-commerce platform
 * Displays welcome message and featured products
 */
function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our E-Commerce Platform</h1>
      <p className="subtitle">Discover amazing products at great prices</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>🛍️ Wide Selection</h3>
          <p>Browse thousands of products across multiple categories</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Checkout</h3>
          <p>Shop with confidence using our secure payment system</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Get your orders delivered quickly and reliably</p>
        </div>
      </div>

      <div className="cta">
        <a href="/products" className="cta-button">Start Shopping</a>
      </div>
    </div>
  )
}

export default Home
