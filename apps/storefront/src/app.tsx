import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import SupportAssistant from './components/SupportAssistant';
import AdminDashboard from './components/AdminDashboard';
import Products from './pages/Products';
import Cart from './pages/cart';
import Header from './components/organisms/Header';
import './App.css';

interface Customer {
  _id: string;
  name: string;
  email: string;
}

function App() {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [currentView, setCurrentView] = useState<'products' | 'admin' | 'assistant' | 'cart'>('products');

  const handleLogin = (customer: Customer) => {
    console.log('App: User logged in', customer);
    setCurrentCustomer(customer);
    setCurrentView('products');
  };

  const handleLogout = () => {
    setCurrentCustomer(null);
    setCurrentView('products');
  };

  if (!currentCustomer) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Header 
          currentView={currentView}
          onViewChange={setCurrentView}
          onCartClick={() => setCurrentView('cart')}
        />

        <main className="app-main">
          {currentView === 'products' && <Products />}
          {currentView === 'cart' && <Cart />}
          {currentView === 'admin' && <AdminDashboard />}
          {currentView === 'assistant' && <SupportAssistant />}
        </main>

        <div className="user-info">
          <span>Welcome, {currentCustomer.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </Router>
  );
}

export default App;