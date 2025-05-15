import React, { useState } from 'react';
import "../styles/product.css"

function ProductCard({ product, isRetailer, isEditable, onEditPrice, onRemovePost }) {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditPrice(product.id, newPrice);
    setEditMode(false);
  };

  return (
    <div className="product-card card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Average Price: ₹{product.averagePrice}/kg</p>
      <p>Available Quantity: {product.availableQuantity} kg</p>
      {isEditable ? (
        editMode ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn">Save</button>
            <button onClick={() => setEditMode(false)} className="btn cancel">Cancel</button>
          </form>
        ) : (
          <>
            <p>Your Price: ₹{product.price}/kg</p>
            <button onClick={() => setEditMode(true)} className="btn">Edit Price</button>
            <button onClick={() => onRemovePost(product.id)} className="btn remove">Remove Post</button>
          </>
        )
      ) : (
        <p>Price: ₹{product.price}/kg</p>
      )}
      {isRetailer && (
        <button className="btn">Buy Now</button>
      )}
    </div>
  );
}

export default ProductCard;