import React, { useState, useEffect } from 'react';
import { api, Product } from '../lib/api';
import { useStore } from '../lib/store';
import Button from '../components/atoms/Button';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useStore(); // ✅ ADD cart to trigger re-renders

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    filter === '' || 
    product.tags.includes(filter) ||
    product.category.toLowerCase().includes(filter.toLowerCase()) ||
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    console.log('🛒 Adding product to cart:', product.name);
    if (product.stock > 0) {
      addToCart(product);
      // Force UI update by showing alert
      alert(`Added ${product.name} to cart!`);
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Our Products</h2>
        
        <div className="filter-buttons">
          <button 
            className={filter === '' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('')}
          >
            All
          </button>
          <button 
            className={filter === 'Electronics' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Electronics')}
          >
            Electronics
          </button>
          <button 
            className={filter === 'audio' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('audio')}
          >
            Audio
          </button>
          <button 
            className={filter === 'mobile' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('mobile')}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              
              <div className="product-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <button
              className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found matching your filter.</p>
          <button onClick={() => setFilter('')}>
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;