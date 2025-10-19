import React, { useState, useEffect } from 'react';
import { useStore } from '../lib/store';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingOption, setShippingOption] = useState('standard');
  const [savedItems, setSavedItems] = useState([]);
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const shippingOptions = {
    standard: { cost: 9.99, time: '3-5 business days' },
    express: { cost: 19.99, time: '1-2 business days' },
    overnight: { cost: 39.99, time: 'Next business day' }
  };

  const taxRate = 0.08;
  const subtotal = getTotalPrice();
  const shippingCost = shippingOptions[shippingOption].cost;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const handleApplyPromo = () => {
    if (promoCode.trim() && !promoApplied) {
      setPromoApplied(true);
      // In a real app, you'd validate the promo code with your backend
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setRemovingItem(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItem(null);
    }, 500);
  };

  const handleSaveForLater = (productId: string) => {
    const item = cart.find(item => item.product._id === productId);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      removeFromCart(productId);
    }
  };

  const handleMoveToCart = (savedItem: any) => {
    updateQuantity(savedItem.product._id, savedItem.quantity);
    setSavedItems(prev => prev.filter(item => item.product._id !== savedItem.product._id));
  };

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

  if (cart.length === 0 && !orderConfirmed && savedItems.length === 0) {
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
            <p><strong>Order Total:</strong> ${total.toFixed(2)}</p>
            <p><strong>Items:</strong> {cart.length} products</p>
            <p><strong>Estimated Delivery:</strong> {shippingOptions[shippingOption].time}</p>
          </div>
          <button className="continue-shopping-btn" onClick={handleBackToProducts}>
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
                <span className="summary-label">Subtotal ({cart.length} items):</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span className="summary-label">Shipping:</span>
                <span className="summary-value">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span className="summary-label">Tax:</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">${total.toFixed(2)}</span>
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
        <h1>Your Shopping Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-container">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Cart Items</h2>
            <div className="items-count">{cart.length} Items</div>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div 
                key={item.product._id} 
                className={`cart-item ${removingItem === item.product._id ? 'cart-item-removing' : ''}`}
              >
                <div className="item-image">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <div className="item-meta">
                      <span className={`stock-status ${item.product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <span className="item-sku">SKU: {item.product._id}</span>
                    </div>
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      className="save-later-btn"
                      onClick={() => handleSaveForLater(item.product._id)}
                    >
                      Save for Later
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-pricing">
                    <div className="current-price">${item.product.price.toFixed(2)}</div>
                    <div className="item-total">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <div className="saved-items-section">
              <h3>Saved for Later ({savedItems.length})</h3>
              <div className="saved-items-list">
                {savedItems.map((savedItem) => (
                  <div key={savedItem.product._id} className="cart-item">
                    <div className="item-image">
                      <img src={savedItem.product.imageUrl} alt={savedItem.product.name} />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-info">
                        <h3>{savedItem.product.name}</h3>
                        <p>{savedItem.product.description}</p>
                      </div>
                      
                      <div className="item-actions">
                        <button 
                          className="move-to-cart-btn"
                          onClick={() => handleMoveToCart(savedItem)}
                        >
                          Move to Cart
                        </button>
                        <button 
                          className="remove-btn"
                          onClick={() => setSavedItems(prev => prev.filter(item => item.product._id !== savedItem.product._id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-line">
            <span className="summary-label">Subtotal ({cart.length} items)</span>
            <span className="summary-value">${subtotal.toFixed(2)}</span>
          </div>
          
          {/* Shipping Calculator */}
          <div className="shipping-section">
            <h4>Shipping Method</h4>
            <div className="shipping-options">
              {Object.entries(shippingOptions).map(([key, option]) => (
                <label 
                  key={key}
                  className={`shipping-option ${shippingOption === key ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={key}
                    checked={shippingOption === key}
                    onChange={(e) => setShippingOption(e.target.value)}
                  />
                  <div className="shipping-info">
                    <div className="shipping-type">
                      {key.charAt(0).toUpperCase() + key.slice(1)} Shipping
                    </div>
                    <div className="shipping-time">{option.time}</div>
                  </div>
                  <div className="shipping-cost">${option.cost.toFixed(2)}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="promo-section">
            <h4>Promo Code</h4>
            <div className="promo-input-group">
              <input
                type="text"
                className="promo-input"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              <button 
                className="apply-promo-btn"
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || promoApplied}
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoApplied && (
              <div className="promo-success">Promo code applied successfully!</div>
            )}
          </div>

          <div className="summary-line">
            <span className="summary-label">Tax</span>
            <span className="summary-value">${tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-line total">
            <span className="summary-label">Total</span>
            <span className="summary-value">${total.toFixed(2)}</span>
          </div>

          {/* Trust & Security Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">🔒</div>
              <div className="badge-text">Secure Checkout</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">🚚</div>
              <div className="badge-text">Free Returns</div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⭐</div>
              <div className="badge-text">5-Star Support</div>
            </div>
          </div>

          <button 
            className="checkout-btn" 
            onClick={handleProceedToCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
          
          <button 
            className="continue-shopping-btn" 
            onClick={() => window.location.reload()}
          >
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
  );
};

export default Cart;