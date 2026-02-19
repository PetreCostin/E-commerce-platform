import React, { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Products component - Displays product catalog
 * Fetches products from backend API and handles filtering
 */
function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // In production, this would call the backend API
      // const response = await axios.get('/api/products')
      // setProducts(response.data)
      
      // Mock data for demonstration
      const mockProducts = [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 79.99,
          category: 'Electronics',
          description: 'High-quality wireless headphones with noise cancellation'
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: 199.99,
          category: 'Electronics',
          description: 'Feature-rich smartwatch with fitness tracking'
        },
        {
          id: 3,
          name: 'Running Shoes',
          price: 89.99,
          category: 'Sports',
          description: 'Comfortable running shoes for all terrains'
        },
        {
          id: 4,
          name: 'Backpack',
          price: 49.99,
          category: 'Accessories',
          description: 'Durable backpack with multiple compartments'
        }
      ]
      
      setProducts(mockProducts)
      setLoading(false)
    } catch (err) {
      setError('Failed to load products')
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  )

  if (loading) return <div className="loading">Loading products...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="products">
      <h1>Products</h1>
      
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-results">No products found matching your search.</p>
      )}
    </div>
  )
}

export default Products
