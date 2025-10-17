import React, { useState } from 'react';
import { useStore } from '../lib/store';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setOrderConfirmed(false);
    }, 3000);
  };

  const handleBackToProducts = () => {
    setShowCheckout(false);
    setOrderConfirmed(false);
  };

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some amazing products to get started!</p>
          <button className="continue-shopping-btn" onClick={() => window.location.reload()}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="cart-page">
        <div className="order-confirmation">
          <div className="confirmation-icon">✅</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
          <div className="order-details">
            <p><strong>Order Total:</strong> ${getTotalPrice().toFixed(2)}</p>
            <p><strong>Items:</strong> {cart.length} products</p>
            <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
          </div>
          <button className="back-to-shop-btn" onClick={handleBackToProducts}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="checkout-container">
          <div className="checkout-header">
            <button className="back-btn" onClick={handleBackToProducts}>
              ← Back to Cart
            </button>
            <h2>Checkout</h2>
          </div>

          <div className="checkout-content">
            <div className="checkout-section">
              <h3>Shipping Information</h3>
              <div className="checkout-form">
                <div className="form-row">
                  <input type="text" placeholder="Full Name" className="form-input" />
                  <input type="email" placeholder="Email Address" className="form-input" />
                </div>
                <input type="text" placeholder="Shipping Address" className="form-input" />
                <div className="form-row">
                  <input type="text" placeholder="City" className="form-input" />
                  <input type="text" placeholder="ZIP Code" className="form-input" />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>💳 Credit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>📱 PayPal</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>🍎 Apple Pay</span>
                </label>
              </div>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping:</span>
                <span>$9.99</span>
              </div>
              <div className="summary-line">
                <span>Tax:</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Total:</span>
                <span>${(getTotalPrice() + 9.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <button className="confirm-order-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product._id} className="cart-item">
              <div className="item-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-description">{item.product.description}</p>
                <p className="item-price">${item.product.price}</p>
              </div>

              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
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
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Items ({cart.length}):</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>$9.99</span>
            </div>
            <div className="summary-item">
              <span>Tax:</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${(getTotalPrice() + 9.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
            
            <button className="continue-shopping-btn" onClick={() => window.location.reload()}>
              Continue Shopping
            </button>

            {cart.length > 0 && (
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;