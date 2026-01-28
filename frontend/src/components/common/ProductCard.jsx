import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        {product.imageUrl && (
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        )}
        {!product.imageUrl && (
          <div className="product-image-placeholder">No Image</div>
        )}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">${product.price?.toFixed(2)}</span>
            <span className={`product-stock ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </Link>
      {product.stockQuantity > 0 && onAddToCart && (
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
