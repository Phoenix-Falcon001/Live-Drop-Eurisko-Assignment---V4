import React, { useState } from 'react';
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'products':
        return <Products />;
      case 'cart':
        return <Cart />;
      case 'admin':
        return <AdminDashboard />;
      case 'assistant':
        return <SupportAssistant />;
      default:
        return <Products />;
    }
  };

  if (!currentCustomer) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onViewChange={setCurrentView}
        onCartClick={() => setCurrentView('cart')}
      />

      <main className="app-main">
        {renderCurrentView()}
      </main>

      <div className="user-info">
        <span>Welcome, {currentCustomer.name}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default App;