import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch notifications from the database
    // For now, we'll use dummy data
    setNotifications([
      { id: 1, message: 'Your order of Tomatoes has been shipped', isRead: false },
      { id: 2, message: 'New order received for Potatoes', isRead: true },
    ]);
  }, []);

  const handleMarkAsRead = (id) => {
    // TODO: Update notification status in the database
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const handleClearAll = () => {
    // TODO: Clear all notifications in the database
    setNotifications([]);
  };

  return (
    <div className="notifications">
      <h1>Notifications</h1>
      <button onClick={handleClearAll} className="btn clear-all">Clear All</button>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-card ${notif.isRead ? 'read' : 'unread'}`}>
            <p>{notif.message}</p>
            {!notif.isRead && (
              <button onClick={() => handleMarkAsRead(notif.id)} className="btn mark-read">
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;