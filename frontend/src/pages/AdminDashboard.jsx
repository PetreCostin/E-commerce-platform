import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-grid">
        <Link to="/admin/products" className="dashboard-card">
          <div className="card-icon">📦</div>
          <h2>Products</h2>
          <p>Manage product inventory</p>
        </Link>

        <Link to="/admin/categories" className="dashboard-card">
          <div className="card-icon">🏷️</div>
          <h2>Categories</h2>
          <p>Manage product categories</p>
        </Link>

        <Link to="/admin/orders" className="dashboard-card">
          <div className="card-icon">🛒</div>
          <h2>Orders</h2>
          <p>View and manage orders</p>
        </Link>

        <Link to="/admin/users" className="dashboard-card">
          <div className="card-icon">👥</div>
          <h2>Users</h2>
          <p>Manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
