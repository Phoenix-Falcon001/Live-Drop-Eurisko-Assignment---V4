import React, { useState } from 'react';
import { api, Customer } from '../lib/api';

interface UserLoginProps {
  onLogin: (customer: Customer) => void;
}

export const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const customer = await api.getCustomerByEmail(email);
      onLogin(customer);
    } catch (err) {
      setError('Customer not found. Please try demo@example.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login">
      <h2>Welcome to Our Store</h2>
      <p>Enter your email to continue</p>
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email (demo@example.com)"
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Continue'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      
      <div className="demo-info">
        <p><strong>Demo Account:</strong> demo@example.com</p>
      </div>
    </div>
  );
};