import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/index.js'

/**
 * Orders component – displays the authenticated user's order history.
 */
function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders')
      setOrders(response.data)
    } catch (err) {
      setError('Failed to load orders. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      await api.patch(`/orders/${orderId}/cancel`)
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED' } : o))
      )
    } catch (err) {
      alert('Failed to cancel order.')
    }
  }

  if (loading) return <div className="loading">Loading orders…</div>
  if (error) return <div className="error">{error}</div>

  if (orders.length === 0) {
    return (
      <div className="orders">
        <h1>My Orders</h1>
        <p>You have no orders yet. <Link to="/products">Browse products</Link></p>
      </div>
    )
  }

  return (
    <div className="orders">
      <h1>My Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>Order #{order.id}</span>
              <span className={`order-status status-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <p className="order-date">
              Placed: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="order-address">Ship to: {order.shippingAddress}</p>
            <div className="order-items">
              {order.orderItems && order.orderItems.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.product?.name || 'Product'}</span>
                  <span>×{item.quantity}</span>
                  <span>${parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <p className="order-total">
              Total: <strong>${parseFloat(order.totalAmount).toFixed(2)}</strong>
            </p>
            {order.status === 'PENDING' && (
              <button
                className="cancel-button"
                onClick={() => handleCancel(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
