import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Transactions() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch transactions from the database
    // For now, we'll use dummy data
    setCurrentOrders([
      { id: 1, product: 'Tomatoes', quantity: 50, totalPrice: 900, status: 'In Transit' },
    ]);
    setAllOrders([
      { id: 2, product: 'Potatoes', quantity: 100, totalPrice: 1400, status: 'Delivered' },
    ]);
  }, []);

  return (
    <div className="transactions">
      <h1>Transactions</h1>
      <h2>Current Orders</h2>
      <div className="order-list">
        {currentOrders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.product}</h3>
            <p>Quantity: {order.quantity} kg</p>
            <p>Total Price: ₹{order.totalPrice}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
      <h2>All Orders</h2>
      <div className="order-list">
        {allOrders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.product}</h3>
            <p>Quantity: {order.quantity} kg</p>
            <p>Total Price: ₹{order.totalPrice}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;