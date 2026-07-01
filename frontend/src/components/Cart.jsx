import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/index.js'

/**
 * Cart component – shows cart contents and provides a checkout form.
 */
function Cart({ cartItems, setCartItems, isAuthenticated }) {
  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setError('')
    setLoading(true)
    try {
      const orderPayload = {
        shippingAddress,
        totalAmount: total,
        orderItems: cartItems.map((item) => ({
          product: { id: item.id },
          quantity: item.quantity,
          price: item.price,
        })),
      }
      await api.post('/orders', orderPayload)
      setCartItems([])
      navigate('/orders')
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty. <Link to="/products">Browse products</Link></p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <div className="cart-item-qty">
              <button onClick={() => updateQuantity(item.id, -1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <span className="cart-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button className="remove-item" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="cart-total">Total: <strong>${total.toFixed(2)}</strong></p>

      {isAuthenticated ? (
        <form onSubmit={handleCheckout} className="checkout-form">
          <h2>Checkout</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              rows={3}
              placeholder="Enter your full shipping address"
            />
          </div>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Placing order…' : 'Place Order'}
          </button>
        </form>
      ) : (
        <p>
          <Link to="/login">Log in</Link> to place your order.
        </p>
      )}
    </div>
  )
}

export default Cart
