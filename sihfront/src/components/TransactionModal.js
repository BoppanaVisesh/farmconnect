// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addTransaction } from '../utils/api';
// import { calculateTotal, formatPrice } from '../utils/helpers';
// import '../styles/TransactionModal.css';

// const TransactionModal = ({ product, onClose, buyerId, buyerName }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [redirecting, setRedirecting] = useState(false);
//   const navigate = useNavigate();
  
//   const maxQuantity = product.availableQuantity;
//   const totalPrice = calculateTotal(quantity, product.price);
  
//   const handleQuantityChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (value > 0 && value <= maxQuantity) {
//       setQuantity(value);
//     }
//   };
  
//   useEffect(() => {
//     // Handle navigation after successful transaction
//     let navigationTimer;
//     if (success && !redirecting) {
//       setRedirecting(true);
//       // Use a longer delay to ensure smooth transition
//       navigationTimer = setTimeout(() => {
//         onClose();
//         navigate('/transactions');
//       }, 2000);
//     }
    
//     // Cleanup timer on component unmount
//     return () => {
//       if (navigationTimer) clearTimeout(navigationTimer);
//     };
//   }, [success, redirecting, navigate, onClose]);
  
//   // Prevent scrolling of the background when modal is open
//   useEffect(() => {
//     // Save original overflow style
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     // Disable scrolling on body when modal is open
//     document.body.style.overflow = 'hidden';
    
//     // Re-enable scrolling when component unmounts
//     return () => {
//       document.body.style.overflow = originalStyle;
//     };
//   }, []);
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     try {
//       // Create transaction object
//       const transaction = {
//         productId: product.id,
//         productName: product.name,
//         productImage: product.image,
//         quantity: quantity,
//         unit: 'kg',
//         unitPrice: product.price,
//         totalAmount: totalPrice,
//         buyerId: buyerId,
//         buyerName: buyerName,
//         sellerId: product.farmerId || product.id,
//         sellerName: product.farmerName || "Farmer",
//         farmerLocation: product.farmerLocation || "Unknown",
//       };
      
//       await addTransaction(transaction);
//       setSuccess(true);
      
//       // Don't navigate immediately - let the useEffect handle it
//       // This fixes the blinking issue by properly handling state transitions
//     } catch (err) {
//       console.error('Transaction error:', err);
//       setError("Failed to complete transaction. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleClose = () => {
//     if (!loading && !success) {
//       onClose();
//     }
//   };
  
//   return (
//     <div 
//       className="modal-overlay" 
//       onClick={(e) => {
//         // Only close if explicitly clicking the overlay background
//         if (e.target === e.currentTarget && !loading && !success) {
//           onClose();
//         }
//       }}
//     >
//       <div 
//         className="transaction-modal" 
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button 
//           className="close-btn" 
//           onClick={handleClose}
//           disabled={loading || redirecting}
//         >
//           &times;
//         </button>
//         <h2>Complete Your Purchase</h2>
        
//         {success ? (
//           <div className="success-message">
//             <i className="fas fa-check-circle"></i>
//             <p>Transaction successful!</p>
//             <p className="redirect-message">
//               {redirecting ? "Redirecting to your transactions..." : ""}
//             </p>
//             <div className="loading-bar">
//               <div className="loading-progress"></div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="product-summary">
//               <img src={product.image} alt={product.name} className="product-image-small" />
//               <div className="product-details">
//                 <h3>{product.name}</h3>
//                 <p>Price: ₹{product.price}/kg</p>
//                 <p>Available: {product.availableQuantity} kg</p>
//                 {product.farmerName && <p>Seller: {product.farmerName}</p>}
//                 {product.farmerLocation && <p>Location: {product.farmerLocation}</p>}
//               </div>
//             </div>
            
//             {error && <p className="error">{error}</p>}
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="quantity">Quantity (kg):</label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   min="1"
//                   max={maxQuantity}
//                   value={quantity}
//                   onChange={handleQuantityChange}
//                   required
//                 />
//               </div>
              
//               <div className="price-summary">
//                 <div className="price-row">
//                   <span>Unit Price:</span>
//                   <span>{formatPrice(product.price)}/kg</span>
//                 </div>
//                 <div className="price-row">
//                   <span>Quantity:</span>
//                   <span>{quantity} kg</span>
//                 </div>
//                 <div className="price-row total">
//                   <span>Total Price:</span>
//                   <span>{formatPrice(totalPrice)}</span>
//                 </div>
//               </div>
              
//               <div className="button-group">
//                 <button type="button" className="btn cancel" onClick={handleClose}>Cancel</button>
//                 <button type="submit" className="btn" disabled={loading}>
//                   {loading ? "Processing..." : "Confirm Purchase"}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionModal;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransaction } from '../utils/api';
import { calculateTotal, formatPrice } from '../utils/helpers';

const TransactionModal = ({ product, onClose, buyerId, buyerName }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  
  const maxQuantity = product.availableQuantity;
  const totalPrice = calculateTotal(quantity, product.price);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= maxQuantity) {
      setQuantity(value);
    }
  };
  
  // Handle navigation and modal closing
  useEffect(() => {
    let navigationTimer;
    
    if (success && !redirecting) {
      setRedirecting(true);
      // Use a single timer for navigation to avoid state flickering
      navigationTimer = setTimeout(() => {
        // First close the modal
        onClose();
        // Then navigate (without causing visual flickering)
        setTimeout(() => {
          navigate('/transactions');
        }, 100);
      }, 2000);
    }
    
    return () => {
      if (navigationTimer) clearTimeout(navigationTimer);
    };
  }, [success, redirecting, navigate, onClose]);
  
  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    // Use a simple class toggle approach instead of direct style manipulation
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);
  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    setLoading(true);
    setError("");
    
    try {
      // Create transaction object
      const transaction = {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity: quantity,
        unit: 'kg',
        unitPrice: product.price,
        totalAmount: totalPrice,
        buyerId: buyerId,
        buyerName: buyerName,
        sellerId: product.farmerId || product.id,
        sellerName: product.farmerName || "Farmer",
        farmerLocation: product.farmerLocation || "Unknown",
      };
      
      await addTransaction(transaction);
      setSuccess(true);
    } catch (err) {
      console.error('Transaction error:', err);
      setError("Failed to complete transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    if (!loading && !success) {
      onClose();
    }
  };
  
  return (
    <div 
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        className="transaction-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="close-btn"
          onClick={handleClose}
          disabled={loading || redirecting}
          type="button"
        >
          &times;
        </button>
        <h2>Complete Your Purchase</h2>
        
        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>Transaction successful!</p>
            {redirecting && (
              <p className="redirect-message">
                Redirecting to your transactions...
              </p>
            )}
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="product-summary">
              <img src={product.image} alt={product.name} className="product-image-small" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}/kg</p>
                <p>Available: {product.availableQuantity} kg</p>
                {product.farmerName && <p>Seller: {product.farmerName}</p>}
                {product.farmerLocation && <p>Location: {product.farmerLocation}</p>}
              </div>
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <div className="transaction-form">
              <div className="form-group">
                <label htmlFor="quantity">Quantity (kg):</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={maxQuantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </div>
              
              <div className="price-summary">
                <div className="price-row">
                  <span>Unit Price:</span>
                  <span>{formatPrice(product.price)}/kg</span>
                </div>
                <div className="price-row">
                  <span>Quantity:</span>
                  <span>{quantity} kg</span>
                </div>
                <div className="price-row total">
                  <span>Total Price:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <div className="button-group">
                <button 
                  type="button" 
                  className="btn cancel" 
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn confirm" 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm Purchase"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;