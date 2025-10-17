import React, { useState } from 'react';

interface Customer {
  _id: string;
  name: string;
  email: string;
}

interface UserLoginProps {
  onLogin: (customer: Customer) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const demoCustomer: Customer = {
      _id: '1',
      name: 'Demo User',
      email: email || 'demo@example.com'
    };
    
    onLogin(demoCustomer);
  };

  const handleDemoLogin = () => {
    const demoCustomer: Customer = {
      _id: '1',
      name: 'Demo User', 
      email: 'demo@example.com'
    };
    onLogin(demoCustomer);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">🛍️ TechStore</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>
          
          <button type="submit" className="login-btn">
            Continue to Shop
          </button>
        </form>
        
        <div className="demo-section">
          <div className="divider">
            <span>Quick Demo</span>
          </div>
          <button onClick={handleDemoLogin} className="demo-btn">
            🚀 Use Demo Account
          </button>
          <p className="demo-hint">Click above to instantly access the demo store</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;