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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useStore();

  // Mock products data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 199.99,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'bluetooth', 'noise-cancelling'],
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        stock: 50
      },
      {
        _id: '2',
        name: 'Smartphone Pro',
        description: 'Latest smartphone with advanced triple camera system, 5G connectivity, and all-day battery life.',
        price: 999.99,
        category: 'Electronics',
        tags: ['mobile', 'smartphone', 'camera', '5g'],
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        stock: 30
      },
      {
        _id: '3',
        name: 'Laptop Ultra',
        description: 'Thin and light laptop with high-performance processor, stunning 4K display, and 12-hour battery.',
        price: 1299.99,
        category: 'Electronics',
        tags: ['laptop', 'portable', 'work', 'gaming'],
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        stock: 20
      },
      {
        _id: '4',
        name: 'Smart Watch Series X',
        description: 'Advanced smartwatch with health monitoring, GPS tracking, and always-on display.',
        price: 349.99,
        category: 'Wearables',
        tags: ['watch', 'fitness', 'health', 'smart'],
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        stock: 75
      },
      {
        _id: '5',
        name: 'Tablet Mini',
        description: 'Compact tablet perfect for reading, browsing, streaming, and productivity on the go.',
        price: 449.99,
        category: 'Electronics',
        tags: ['tablet', 'portable', 'entertainment', 'reading'],
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        stock: 40
      },
      {
        _id: '6',
        name: 'Gaming Console Pro',
        description: 'Next-gen gaming console with 4K gaming, immersive audio, and extensive game library.',
        price: 499.99,
        category: 'Gaming',
        tags: ['gaming', 'console', 'entertainment', '4k'],
        imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
        stock: 25
      }
    ];
    
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const filteredProducts = products.filter(product =>
    (filter === '' || product.tags.includes(filter) || product.category === filter) &&
    (searchTerm === '' || 
     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddToCart = (product: Product) => {
    if (product.stock > 0) {
      addToCart(product);
      alert(`✅ Added ${product.name} to cart!`);
    } else {
      alert('❌ Sorry, this product is out of stock!');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Header Section */}
      <div className="products-header">
        <div className="header-content">
          <h1>Discover Amazing Products</h1>
          <p>Find the perfect tech for your lifestyle</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="products-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <h3>Categories</h3>
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
              📱 Electronics
            </button>
            <button 
              className={filter === 'Wearables' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('Wearables')}
            >
              ⌚ Wearables
            </button>
            <button 
              className={filter === 'Gaming' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('Gaming')}
            >
              🎮 Gaming
            </button>
            <button 
              className={filter === 'audio' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('audio')}
            >
              🎧 Audio
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-badge">{product.category}</div>
            </div>
            
            <div className="product-content">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-meta">
                <div className="price-section">
                  <span className="product-price">${product.price}</span>
                  <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                
                <div className="product-tags">
                  {product.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <button
                className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? (
                  <>
                    <span>🛒 Add to Cart</span>
                    <span className="btn-price">${product.price}</span>
                  </>
                ) : (
                  'Out of Stock'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setFilter('');
              setSearchTerm('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;