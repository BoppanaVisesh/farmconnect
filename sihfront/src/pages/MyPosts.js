import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../contexts/AuthContext';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // TODO: Fetch user's posts from the database
    // For now, we'll use dummy data
    setPosts([
      { id: 1, name: 'Tomatoes', image: '/assets/images/tomatoes.jpg', averagePrice: 20, availableQuantity: 100, price: 18 },
      { id: 2, name: 'Potatoes', image: '/assets/images/potatoes.jpg', averagePrice: 15, availableQuantity: 150, price: 14 },
    ]);
  }, []);

  const handleEditPrice = (id, newPrice) => {
    // TODO: Update price in the database
    setPosts(posts.map(post => post.id === id ? { ...post, price: newPrice } : post));
  };

  const handleRemovePost = (id) => {
    // TODO: Remove post from the database
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="my-posts">
      <h1>My Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <ProductCard 
            key={post.id} 
            product={post} 
            onEditPrice={handleEditPrice}
            onRemovePost={handleRemovePost}
            isEditable={true}
          />
        ))}
      </div>
    </div>
  );
}

export default MyPosts;