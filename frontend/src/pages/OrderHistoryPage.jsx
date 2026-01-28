import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#f39c12';
      case 'PROCESSING': return '#3498db';
      case 'SHIPPED': return '#9b59b6';
      case 'DELIVERED': return '#27ae60';
      case 'CANCELLED': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      <ErrorMessage message={error} onClose={() => setError('')} />

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.product?.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">${item.price?.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total:</strong>
                  <strong>${order.totalAmount?.toFixed(2)}</strong>
                </div>
                <button 
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="view-details-btn"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
