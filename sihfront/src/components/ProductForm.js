import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    availableQuantity: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form d-flex flex-column align-items-center card">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleInputChange}
        className="input"
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleInputChange}
        className="input"
        required
      />
      <input
        type="number"
        name="availableQuantity"
        placeholder="Available Quantity (kg)"
        value={formData.availableQuantity}
        onChange={handleInputChange}
        className="input"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price per kg"
        value={formData.price}
        onChange={handleInputChange}
        className="input"
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleInputChange}
        className="input"
      ></textarea>
    <div className="row justify-content-center mt-3">
  <div className="col-auto">
    <button type="submit" className="btn btn-success">Add Product</button>
  </div>
</div>

      <button type="button" onClick={onCancel} className="btn cancel">Cancel</button>
    </form>
  );
}

export default ProductForm;