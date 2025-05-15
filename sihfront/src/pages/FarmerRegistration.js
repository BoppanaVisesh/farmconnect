import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Registration.css'; // Import CSS file

function FarmerRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phoneNumber: '',
    address: '',
    passbookNo: '',
    language: 'english'
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
      await register(formData, 'farmer');
      navigate('/farmer-dashboard');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <h1>Farmer Registration</h1>
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
          <input
            type="text"
            name="passbookNo"
            placeholder="Passbook Number"
            value={formData.passbookNo}
            onChange={handleInputChange}
            className="input"
            required
          />
          <select
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="input"
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            {/* Add more language options */}
          </select>
          <button type="submit" className="btn">Register</button>
        </form>
        <p>If you have any issues registering, please visit your nearest Mee Seva centre for assistance.</p>
      </div>
    </div>
  );
}

export default FarmerRegistration;