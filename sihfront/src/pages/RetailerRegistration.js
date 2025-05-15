import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Registration.css'; // Import CSS file

function RetailerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phoneNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData, 'retailer');
      navigate('/retailer-dashboard');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <h1>Retailer Registration</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
            required
          />
          <input
            type="text"
            name="aadhar"
            placeholder="Aadhar Number"
            value={formData.aadhar}
            onChange={handleInputChange}
            className="input"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="input"
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="input"
            required
          ></textarea>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RetailerRegistration;