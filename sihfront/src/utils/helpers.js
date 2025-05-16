// Helper functions for FarmConnect application

// Format price to Indian Rupee format
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(price);
};

// Format date to readable format
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Calculate total price from quantity and per unit price
export const calculateTotal = (quantity, unitPrice) => {
  return quantity * unitPrice;
};

// Get transaction status color
export const getStatusColor = (status) => {
  const statusColors = {
    'Pending': '#f57c00',    // Orange
    'In Transit': '#1976d2', // Blue
    'Delivered': '#388e3c',  // Green
    'Cancelled': '#d32f2f',  // Red
    'Completed': '#388e3c'   // Green
  };
  
  return statusColors[status] || '#757575'; // Default gray
};

// Generate transaction ID (for display purposes)
export const generateTransactionId = (id) => {
  return `TRX${id.toString().padStart(8, '0')}`;
};
