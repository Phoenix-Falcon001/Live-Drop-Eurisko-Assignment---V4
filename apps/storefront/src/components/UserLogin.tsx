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
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const demoCustomer: Customer = {
      _id: '1',
      name: email ? email.split('@')[0] : 'Demo User',
      email: email || 'demo@example.com'
    };
    
    onLogin(demoCustomer);
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoCustomer: Customer = {
      _id: '1',
      name: 'Demo User', 
      email: 'demo@example.com'
    };
    onLogin(demoCustomer);
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="logo-container">
            {/* Replace with your actual logo */}
            <div className="logo">🛍️</div>
            <span className="logo-text">TechStore</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue shopping</p>
        </div>
        
        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              autoComplete="email"
              required
            />
          </div>
          
          {/* Additional Features (for future use) */}
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className={`login-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              'Continue to Shop'
            )}
          </button>
        </form>
        
        {/* Demo Section */}
        <div className="demo-section">
          <div className="divider">
            <span>Quick Demo</span>
          </div>
          <button 
            onClick={handleDemoLogin} 
            className={`demo-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Loading Demo...
              </>
            ) : (
              <>
                🚀 Use Demo Account
              </>
            )}
          </button>
          <p className="demo-hint">Experience the full store instantly with demo data</p>
        </div>

        {/* Trust & Security Section */}
        <div className="trust-section">
          <div className="security-badges">
            <div className="badge">
              <span className="badge-icon">🔒</span>
              <span className="badge-text">Secure Login</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">SSL Encrypted</span>
            </div>
            <div className="badge">
              <span className="badge-icon">✓</span>
              <span className="badge-text">Privacy First</span>
            </div>
          </div>
          
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#" className="legal-link">Terms of Service</a>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="signup-section">
          <p>
            Don't have an account?{' '}
            <a href="#" className="signup-link">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;