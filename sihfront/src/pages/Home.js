import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css'; // Import the CSS file

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="overlay">
        <h1>Welcome to FarmConnect</h1>
        {user ? (
          <p className="welcome-message">Hello, {user.name}! Go to your <Link to={user.type === 'farmer' ? '/farmer-dashboard' : '/retailer-dashboard'} className="dashboard-link">dashboard</Link>.</p>
        ) : (
          <div className="auth-options">
            <p>Connect farmers and retailers directly!</p>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/farmer-registration" className="btn">Register as Farmer</Link>
            <Link to="/retailer-registration" className="btn">Register as Retailer</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;