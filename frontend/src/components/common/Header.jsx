import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartItemCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>E-Commerce Store</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          
          {user ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">Admin</Link>
              )}
              <button onClick={handleLogout} className="nav-link btn-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
