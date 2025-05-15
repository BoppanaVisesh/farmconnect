import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';

function RetailerDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch products from the database based on retailer's location
    // For now, we'll use dummy data
    setProducts([
      { id: 1, name: 'Tomatoes', image: '/assets/images/tomatoes.jpg', averagePrice: 20, availableQuantity: 100, price: 18, farmerLocation: 'City A' },
      { id: 2, name: 'Potatoes', image: '/assets/images/potatoes.jpg', averagePrice: 15, availableQuantity: 150, price: 14, farmerLocation: 'City B' },
    ]);
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="retailer-dashboard">
      <h1>Welcome, {user.name}</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="input search-input"
      />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} isRetailer={true} />
        )
    )}
    </div>
  </div>
);
}

export default RetailerDashboard;