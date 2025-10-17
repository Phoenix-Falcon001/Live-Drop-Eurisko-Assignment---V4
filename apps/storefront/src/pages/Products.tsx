import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stock: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useStore();

  // Mock products data - SIMPLE VERSION
  useEffect(() => {
    console.log('🔄 Loading products...');
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'bluetooth'],
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        stock: 50
      },
      {
        _id: '2',
        name: 'Smartphone Pro',
        description: 'Latest smartphone with advanced triple camera system and all-day battery.',
        price: 999.99,
        category: 'Electronics',
        tags: ['mobile', 'smartphone', 'camera'],
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        stock: 30
      },
      {
        _id: '3',
        name: 'Laptop Ultra',
        description: 'Thin and light laptop with high-performance processor and stunning display.',
        price: 1299.99,
        category: 'Electronics',
        tags: ['laptop', 'portable', 'work'],
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        stock: 20
      },
      {
        _id: '4',
        name: 'Smart Watch',
        description: 'Advanced smartwatch with health monitoring and GPS tracking.',
        price: 349.99,
        category: 'Wearables',
        tags: ['watch', 'fitness', 'smart'],
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        stock: 75
      },
      {
        _id: '5',
        name: 'Tablet Mini',
        description: 'Compact tablet perfect for reading, browsing, and entertainment.',
        price: 449.99,
        category: 'Electronics',
        tags: ['tablet', 'portable', 'entertainment'],
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        stock: 40
      },
      {
        _id: '6',
        name: 'Gaming Console',
        description: 'Next-gen gaming console with 4K gaming and immersive experience.',
        price: 499.99,
        category: 'Gaming',
        tags: ['gaming', 'console', 'entertainment'],
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
        stock: 25
      }
    ];
    
    setProducts(mockProducts);
    setLoading(false);
    console.log('✅ Products loaded:', mockProducts.length);
  }, []);

  const filteredProducts = products.filter(product =>
    filter === '' || 
    product.tags.includes(filter) ||
    product.category.toLowerCase().includes(filter.toLowerCase()) ||
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    console.log('🛒 Adding to cart:', product.name);
    if (product.stock > 0) {
      addToCart(product);
      alert(`Added ${product.name} to cart!`);
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing tech products</p>
        
        <div className="filter-buttons">
          <button 
            className={filter === '' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('')}
          >
            All Products
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
          <button 
            className={filter === 'laptop' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('laptop')}
          >
            Laptops
          </button>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-overlay">
                <span className="product-category">{product.category}</span>
              </div>
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-details">
                <div className="product-price">${product.price}</div>
                <div className={`product-stock ${product.stock === 0 ? 'out-of-stock' : 'in-stock'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
              
              <div className="product-tags">
                {product.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="product-actions">
              <button
                className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try changing your filter criteria</p>
          <button 
            className="clear-filter-btn"
            onClick={() => setFilter('')}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;