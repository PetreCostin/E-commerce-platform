import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import ErrorMessage from '../components/common/ErrorMessage';
import SuccessMessage from '../components/common/SuccessMessage';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await userService.updateUserProfile(user.id, formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-info">
          <div className="info-section">
            <h2>Account Information</h2>
            <div className="info-item">
              <strong>User ID:</strong>
              <span>{user?.id}</span>
            </div>
            <div className="info-item">
              <strong>Role:</strong>
              <span className="role-badge">{user?.role}</span>
            </div>
          </div>

          <div className="info-section">
            <h2>Update Profile</h2>
            <ErrorMessage message={error} onClose={() => setError('')} />
            <SuccessMessage message={success} onClose={() => setSuccess('')} />

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
