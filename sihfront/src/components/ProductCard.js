import React, { useState, useCallback, memo } from 'react';
import "../styles/product.css";
import TransactionModal from './TransactionModal';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = memo(function ProductCard({ product, isRetailer, isEditable, onEditPrice, onRemovePost }) {
  const [editMode, setEditMode] = useState(false);
  const [newPrice, setNewPrice] = useState(product.price);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const { user } = useAuth();

  const handleEditSubmit = useCallback((e) => {
    e.preventDefault();
    onEditPrice(product.id, newPrice);
    setEditMode(false);
  }, [product.id, newPrice, onEditPrice]);

  const handleBuyClick = useCallback((e) => {
    // Prevent the event from bubbling up
    e.stopPropagation();
    setShowTransactionModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowTransactionModal(false);
  }, []);

  // Fix for "process is not defined" error by creating a fallback mechanism
  // that doesn't rely on process.env
  const getImageSrc = () => {
    if (!product.image) {
      return '/placeholder.jpg';
    }
    
    if (product.image.startsWith('/')) {
      return product.image; // Return relative path directly
    }
    
    return product.image;
  };

  return (
    <div className="product-card card">
      <img 
        src={getImageSrc()} 
        alt={product.name} 
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder.jpg';
        }}
      />
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
        <button 
          className="btn" 
          onClick={handleBuyClick}
        >
          Buy Now
        </button>
      )}
      
      {showTransactionModal && (
        <TransactionModal 
          product={product}
          onClose={handleCloseModal}
          buyerId={user.id}
          buyerName={user.name}
        />
      )}
    </div>
  );
});

export default ProductCard;