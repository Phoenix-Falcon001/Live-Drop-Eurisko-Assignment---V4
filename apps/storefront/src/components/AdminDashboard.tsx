import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p className="metric-value">$125,000</p>
        </div>
        <div className="metric-card">
          <h3>Total Orders</h3>
          <p className="metric-value">450</p>
        </div>
        <div className="metric-card">
          <h3>Active Customers</h3>
          <p className="metric-value">120</p>
        </div>
        <div className="metric-card">
          <h3>Satisfaction Rate</h3>
          <p className="metric-value">92.8%</p>
        </div>
      </div>

      <div className="section">
        <h3>Popular Products</h3>
        <div className="products-list">
          <div className="product-item">Wireless Headphones</div>
          <div className="product-item">Smartphone Pro</div>
          <div className="product-item">Laptop Ultra</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;