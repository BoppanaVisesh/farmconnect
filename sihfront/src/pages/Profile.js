import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setError('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
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