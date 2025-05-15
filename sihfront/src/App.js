// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login'; // Importing the Login component
import FarmerRegistration from './pages/FarmerRegistration';
import RetailerRegistration from './pages/RetailerRegistration';
import FarmerDashboard from './pages/FarmerDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import MyPosts from './pages/MyPosts';
import Transactions from './pages/Transactions';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Integrated Login component */}
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/retailer-registration" element={<RetailerRegistration />} />
          {user && user.type === 'farmer' && (
            <>
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/my-posts" element={<MyPosts />} />
            </>
          )}
          {user && user.type === 'retailer' && (
            <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          )}
          {user && (
            <>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
