import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { useAuth } from '../contexts/AuthContext';

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch farmer's products from the database
    // For now, we'll use dummy data
    setProducts([
      { id: 1, name: 'Tomatoes', image: '/assets/images/tomatoes.jpg', averagePrice: 20, availableQuantity: 100, price: 18 },
      { id: 2, name: 'Potatoes', image: '/assets/images/potatoes.jpg', averagePrice: 15, availableQuantity: 150, price: 14 },
    ]);
  }, []);

  const handleAddProduct = (newProduct) => {
    // TODO: Add new product to the database
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setShowProductForm(false);
  };

  return (
    <div className="farmer-dashboard">
      <h1>Welcome, {user.name}</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <button className="btn add-product" onClick={() => setShowProductForm(true)}>
          + Add Product
        </button>
      </div>
      {showProductForm && (
        <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowProductForm(false)} />
      )}
    </div>
  );
}

export default FarmerDashboard;