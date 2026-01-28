import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productService from '../services/productService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      setSuccess('Product added to cart!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error && !product) return <ErrorMessage message={error} />;
  if (!product) return <div className="container">Product not found</div>;

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
          ) : (
            <div className="product-detail-image-placeholder">No Image Available</div>
          )}
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price?.toFixed(2)}</p>
          
          <div className="product-stock-info">
            {product.stockQuantity > 0 ? (
              <span className="in-stock">In Stock ({product.stockQuantity} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.stockQuantity > 0 && (
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stockQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockQuantity, parseInt(e.target.value) || 1)))}
                />
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          )}

          <ErrorMessage message={error} onClose={() => setError('')} />
          <SuccessMessage message={success} onClose={() => setSuccess('')} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
