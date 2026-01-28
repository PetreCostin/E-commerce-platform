import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import orderService from '../services/orderService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(location.state?.message || '');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
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
  if (error && !order) return <ErrorMessage message={error} />;
  if (!order) return <div className="container">Order not found</div>;

  return (
    <div className="order-detail-page">
      <button onClick={() => navigate('/orders')} className="back-button">
        ← Back to Orders
      </button>

      <SuccessMessage message={success} onClose={() => setSuccess('')} />
      <ErrorMessage message={error} onClose={() => setError('')} />

      <div className="order-detail-card">
        <div className="order-header">
          <div>
            <h1>Order #{order.id}</h1>
            <p className="order-date">
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="order-status" style={{ color: getStatusColor(order.status) }}>
            {order.status}
          </div>
        </div>

        <div className="order-sections">
          <div className="section">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items?.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-info">
                    <h3>{item.product?.name}</h3>
                    <p className="item-description">{item.product?.description}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-pricing">
                    <p className="item-unit-price">${item.price?.toFixed(2)} each</p>
                    <p className="item-total-price">
                      ${(item.price * item.quantity)?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Shipping Address</h2>
            <p className="address">{order.shippingAddress}</p>
          </div>

          <div className="section">
            <h2>Order Summary</h2>
            <div className="summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.totalAmount?.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <strong>Total:</strong>
                <strong>${order.totalAmount?.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
