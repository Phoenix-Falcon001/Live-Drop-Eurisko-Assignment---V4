import React, { useState } from 'react';
import { Customer } from '../lib/api';

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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Our Store</h2>
        <p>Enter your email to continue</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter any email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
          />
          <button type="submit" className="login-btn">
            Continue
          </button>
        </form>
        
        <div className="demo-info">
          <p>Demo: demo@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;