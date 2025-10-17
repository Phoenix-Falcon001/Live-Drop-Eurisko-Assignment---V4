import React from 'react';
import { useStore } from '../../lib/store';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onCartClick }) => {
  const { getTotalItems } = useStore();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>TechStore 🛍️</h1>
        </div>
        
        <nav className="nav">
          <button 
            className={currentView === 'products' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onViewChange('products')}
          >
            Products
          </button>
          <button 
            className={currentView === 'assistant' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onViewChange('assistant')}
          >
            Support
          </button>
          <button 
            className={currentView === 'admin' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => onViewChange('admin')}
          >
            Admin
          </button>
        </nav>
        
        <div className="header-actions">
          <button className="cart-btn" onClick={onCartClick}>
            🛒 Cart ({getTotalItems()})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;