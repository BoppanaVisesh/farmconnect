import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getTransactions, updateTransactionStatus } from '../utils/api';
import { formatDate, formatPrice, getStatusColor, generateTransactionId } from '../utils/helpers';
import '../styles/Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(user.id);
        
        // Sort by date (newest first)
        const sortedTransactions = data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        
        setTransactions(sortedTransactions);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error loading transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchTransactions();
    }
  }, [user]);

  const handleStatusUpdate = async (transactionId, newStatus) => {
    try {
      await updateTransactionStatus(transactionId, newStatus);
      setTransactions(prevTransactions => 
        prevTransactions.map(transaction => 
          transaction.id === transactionId
            ? { ...transaction, status: newStatus }
            : transaction
        )
      );
    } catch (err) {
      setError('Failed to update status');
    }
  };

  // Group transactions by status
  const pendingTransactions = transactions.filter(t => t.status === 'Pending' || t.status === 'In Transit');
  const completedTransactions = transactions.filter(t => t.status === 'Delivered' || t.status === 'Completed');
  const cancelledTransactions = transactions.filter(t => t.status === 'Cancelled');

  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="transactions-container">
      <h1>My Transactions</h1>
      
      {transactions.length === 0 ? (
        <div className="no-transactions">
          <i className="fas fa-shopping-cart"></i>
          <p>You don't have any transactions yet.</p>
          {user.type === 'retailer' ? 
            <p>Browse products and make your first purchase!</p> : 
            <p>Add your products to start selling!</p>
          }
        </div>
      ) : (
        <>
          <section className="transactions-section">
            <h2>Active Transactions</h2>
            {pendingTransactions.length === 0 ? (
              <p className="no-items">No active transactions</p>
            ) : (
              <div className="transaction-cards">
                {pendingTransactions.map(transaction => (
                  <TransactionCard 
                    key={transaction.id}
                    transaction={transaction}
                    user={user}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </section>
          
          <section className="transactions-section">
            <h2>Completed Transactions</h2>
            {completedTransactions.length === 0 ? (
              <p className="no-items">No completed transactions</p>
            ) : (
              <div className="transaction-cards">
                {completedTransactions.map(transaction => (
                  <TransactionCard 
                    key={transaction.id}
                    transaction={transaction}
                    user={user}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            )}
          </section>
          
          {cancelledTransactions.length > 0 && (
            <section className="transactions-section">
              <h2>Cancelled Transactions</h2>
              <div className="transaction-cards">
                {cancelledTransactions.map(transaction => (
                  <TransactionCard 
                    key={transaction.id}
                    transaction={transaction}
                    user={user}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function TransactionCard({ transaction, user, onStatusUpdate }) {
  const isBuyer = transaction.buyerId === user.id;
  const otherPartyName = isBuyer ? transaction.sellerName : transaction.buyerName;
  
  const getStatusControls = () => {
    if (transaction.status === 'Cancelled' || transaction.status === 'Completed' || transaction.status === 'Delivered') {
      return null;
    }
    
    // Buyer controls
    if (isBuyer) {
      if (transaction.status === 'Pending') {
        return (
          <>
            <button 
              className="btn cancel" 
              onClick={() => onStatusUpdate(transaction.id, 'Cancelled')}
            >
              Cancel Order
            </button>
          </>
        );
      }
      
      if (transaction.status === 'In Transit') {
        return (
          <button 
            className="btn" 
            onClick={() => onStatusUpdate(transaction.id, 'Delivered')}
          >
            Mark as Received
          </button>
        );
      }
    } 
    // Seller controls
    else {
      if (transaction.status === 'Pending') {
        return (
          <div className="button-group">
            <button 
              className="btn" 
              onClick={() => onStatusUpdate(transaction.id, 'In Transit')}
            >
              Accept & Ship
            </button>
            <button 
              className="btn cancel" 
              onClick={() => onStatusUpdate(transaction.id, 'Cancelled')}
            >
              Decline
            </button>
          </div>
        );
      }
      
      if (transaction.status === 'Delivered') {
        return (
          <button 
            className="btn" 
            onClick={() => onStatusUpdate(transaction.id, 'Completed')}
          >
            Complete Transaction
          </button>
        );
      }
    }
    
    return null;
  };

  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <div className="transaction-id">
          <span>Transaction ID:</span> 
          <strong>{transaction.id || generateTransactionId()}</strong>
        </div>
        <div 
          className="transaction-status" 
          style={{ backgroundColor: getStatusColor(transaction.status) }}
        >
          {transaction.status}
        </div>
      </div>
      
      <div className="transaction-body">
        <div className="transaction-item">
          <img 
            src={transaction.productImage || '/default-product.png'} 
            alt={transaction.productName} 
            className="product-image"
          />
          <div className="transaction-details">
            <h3 className="product-name">{transaction.productName}</h3>
            <p className="product-quantity">Quantity: {transaction.quantity} {transaction.unit}</p>
            <p className="transaction-price">Total: {formatPrice(transaction.totalAmount)}</p>
          </div>
        </div>
        
        <div className="transaction-meta">
          <p className="transaction-date">
            <i className="fas fa-calendar-alt"></i> {formatDate(transaction.date)}
          </p>
          <p className="transaction-party">
            <i className="fas fa-user"></i> {isBuyer ? 'Seller' : 'Buyer'}: {otherPartyName}
          </p>
          {transaction.shippingAddress && (
            <p className="transaction-address">
              <i className="fas fa-map-marker-alt"></i> Shipping to: {transaction.shippingAddress}
            </p>
          )}
          {transaction.paymentMethod && (
            <p className="transaction-payment">
              <i className="fas fa-credit-card"></i> Payment: {transaction.paymentMethod}
            </p>
          )}
        </div>
      </div>
      
      <div className="transaction-footer">
        {getStatusControls()}
        
        {transaction.status === 'Delivered' && isBuyer && (
          <button className="btn secondary">
            <i className="fas fa-star"></i> Review Product
          </button>
        )}
        
        {(transaction.status === 'Completed' || transaction.status === 'Delivered') && (
          <button className="btn secondary">
            <i className="fas fa-file-invoice"></i> View Receipt
          </button>
        )}
      </div>
    </div>
  );
}

export default Transactions;
