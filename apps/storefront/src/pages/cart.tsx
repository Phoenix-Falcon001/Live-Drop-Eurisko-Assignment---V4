import React from 'react';
import { useStore } from '../lib/store';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useStore();

  console.log('🛒 Cart contents:', cart);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Shopping Cart ({cart.length} items)</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.product._id} className="cart-item">
            <div className="item-image">
              <img src={item.product.imageUrl} alt={item.product.name} />
            </div>
            
            <div className="item-details">
              <h3>{item.product.name}</h3>
              <p className="item-price">${item.product.price}</p>
              <p className="item-stock">In stock: {item.product.stock}</p>
            </div>

            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            </div>

            <div className="item-total">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>

            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.product._id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
        </div>
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; // ✅ FIXED: Default export