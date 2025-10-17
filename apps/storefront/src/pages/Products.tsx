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
  const { addToCart, cart } = useStore();

  // Mock products data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        category: 'Electronics',
        tags: ['audio', 'wireless', 'bluetooth'],
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        stock: 50
      },
      {
        _id: '2',
        name: 'Smartphone Pro',
        description: 'Latest smartphone with advanced camera and battery life',
        price: 999.99,
        category: 'Electronics',
        tags: ['mobile', 'smartphone', 'camera'],
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        stock: 30
      },
      {
        _id: '3',
        name: 'Laptop Ultra',
        description: 'Thin and light laptop for professionals',
        price: 1299.99,
        category: 'Electronics',
        tags: ['laptop', 'portable', 'work'],
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        stock: 20
      }
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    filter === '' || 
    product.tags.includes(filter) ||
    product.category.toLowerCase().includes(filter.toLowerCase()) ||
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product.name);
    if (product.stock > 0) {
      addToCart(product);
      alert(`Added ${product.name} to cart!`);
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

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
    </div>
  );
};

export default Products;