import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css'; // Import the CSS file

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    
    try {
      await updateUser(formData);
      setSuccess(true);
      setError('');
    } catch (error) {
      setSuccess(false);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Profile updated successfully!</p>}
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
        <button type="submit" className="btn">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;