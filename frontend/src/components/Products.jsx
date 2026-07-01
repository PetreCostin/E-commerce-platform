import { useState, useEffect } from 'react'
import api from '../api/index.js'

/**
 * Products component – fetches the product catalog from the backend API.
 */
function Products({ addToCart }) {
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
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase())
  )

  if (loading) return <div className="loading">Loading products…</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="products">
      <h1>Products</h1>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">${parseFloat(product.price).toFixed(2)}</p>
            {product.stockQuantity > 0 ? (
              <button className="add-to-cart" onClick={() => addToCart && addToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
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
