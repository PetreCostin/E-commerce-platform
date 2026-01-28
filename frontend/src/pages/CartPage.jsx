import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, loading, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeItem(productId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {!cart.items || cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="item-image">
                  {item.product?.imageUrl ? (
                    <img src={item.product.imageUrl} alt={item.product.name} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                </div>
                
                <div className="item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="item-price">${item.product?.price?.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p>${(item.product?.price * item.quantity)?.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cart.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalPrice?.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
