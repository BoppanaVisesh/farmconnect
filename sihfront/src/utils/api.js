// Mock API functions for FarmConnect

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const TRANSACTIONS_KEY = 'farmconnect_transactions';

// Get transactions from local storage
export const getTransactions = async (userId) => {
  await delay(500); // Simulate network delay
  try {
    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    return transactions.filter(transaction => 
      transaction.buyerId === userId || transaction.sellerId === userId
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

// Add a new transaction
export const addTransaction = async (transactionData) => {
  await delay(800); // Simulate network delay
  try {
    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    
    // Generate a more unique ID
    const newId = `TXID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const newTransaction = {
      ...transactionData,
      id: newId,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
    
    // Simulate a more substantial delay to reduce blinking
    await delay(400);
    
    return newTransaction;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

// Update transaction status
export const updateTransactionStatus = async (transactionId, newStatus) => {
  await delay(500);
  try {
    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: newStatus }
        : transaction
    );
    
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
    return updatedTransactions.find(t => t.id === transactionId);
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction status');
  }
};
