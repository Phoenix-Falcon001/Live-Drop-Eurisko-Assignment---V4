import React, { useState } from 'react';
import { UserLogin } from './components/UserLogin';
import { SupportAssistant } from './components/SupportAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { Products } from './pages/Products';
import { Customer } from './lib/api';
import './App.css';

function App() {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentView, setCurrentView] = useState<'products' | 'admin' | 'assistant'>('products');

  const handleLogin = (customer: Customer) => {
    setCurrentCustomer(customer);
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
  };

  if (!currentCustomer) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>TechStore 🛍️</h1>
          <nav className="nav-menu">
            <button 
              className={currentView === 'products' ? 'active' : ''}
              onClick={() => setCurrentView('products')}
            >
              Products
            </button>
            <button 
              className={currentView === 'assistant' ? 'active' : ''}
              onClick={() => setCurrentView('assistant')}
            >
              Support Assistant
            </button>
            <button 
              className={currentView === 'admin' ? 'active' : ''}
              onClick={() => setCurrentView('admin')}
            >
              Admin Dashboard
            </button>
          </nav>
          <div className="user-info">
            <span>Welcome, {currentCustomer.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'products' && <Products />}
        {currentView === 'assistant' && <SupportAssistant />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <footer className="app-footer">
        <p>TechStore - Complete E-Commerce MVP</p>
      </footer>
    </div>
  );
}

export default App;