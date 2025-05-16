import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import logo from '../images/logo.jpeg'

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hideMyPosts = user?.type === 'retailer' || [
    '/retailer-dashboard',
    '/retailer-dashboard/transactions',
    '/retailer-dashboard/notifications',
    '/retailer-dashboard/profile'
  ].includes(location.pathname);

  return (
    <header className="header">
      <div className="logo-container">
        {/* <i className="fas fa-tractor logo-icon"></i> */}
        <img src={logo} alt="AgroLink  Logo" className="logo-image" /> {/* Add logo image */}
        <Link to="/" className="logo">AgroLink </Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to={user.type === 'farmer' ? '/farmer-dashboard' : '/retailer-dashboard'}>
              <i className="fas fa-home"></i> Home
            </Link>
            {!hideMyPosts && user.type === 'farmer' && (
              <Link to="/my-posts">
                <i className="fas fa-seedling"></i> My Posts
              </Link>
            )}
            <Link to="/transactions">
              <i className="fas fa-exchange-alt"></i> Transactions
            </Link>
            <Link to="/notifications">
              <i className="fas fa-bell"></i> Notifications
            </Link>
            <Link to="/profile">
              <i className="fas fa-user"></i> Profile
            </Link>
            <button onClick={logout} className="btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
