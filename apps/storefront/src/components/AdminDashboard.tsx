import React from 'react';

const AdminDashboard: React.FC = () => {
  const metrics = {
    revenue: 125430,
    orders: 456,
    customers: 123,
    satisfaction: 94.2
  };

  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 30000 }
  ];

  const popularProducts = [
    { name: 'Wireless Headphones', sales: 156, revenue: 31144 },
    { name: 'Smartphone Pro', sales: 89, revenue: 89011 },
    { name: 'Laptop Ultra', sales: 67, revenue: 87099 },
    { name: 'Smart Watch', sales: 134, revenue: 46866 }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Business Overview & Analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Revenue</h3>
            <div className="metric-value">${metrics.revenue.toLocaleString()}</div>
            <div className="metric-trend positive">+12.5% from last month</div>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>Total Orders</h3>
            <div className="metric-value">{metrics.orders}</div>
            <div className="metric-trend positive">+8.3% from last month</div>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Active Customers</h3>
            <div className="metric-value">{metrics.customers}</div>
            <div className="metric-trend positive">+15.2% from last month</div>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>Satisfaction Rate</h3>
            <div className="metric-value">{metrics.satisfaction}%</div>
            <div className="metric-trend positive">+2.1% from last month</div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <div className="revenue-chart">
            {revenueData.map((month, index) => (
              <div key={month.month} className="chart-bar-container">
                <div 
                  className="chart-bar" 
                  style={{ height: `${month.revenue / 300}px` }}
                  title={`${month.month}: $${month.revenue}`}
                >
                  <div className="bar-value">${(month.revenue / 1000).toFixed(0)}k</div>
                </div>
                <span className="bar-label">{month.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="products-card">
          <h3>Popular Products</h3>
          <div className="products-list">
            {popularProducts.map((product, index) => (
              <div key={product.name} className="product-ranking">
                <div className="rank-number">{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-stats">
                    <span className="sales">{product.sales} sales</span>
                    <span className="revenue">${product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(product.sales / 156) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>🔄 Conversion Rate</h4>
          <div className="stat-value">3.2%</div>
          <div className="stat-desc">Website visitors to customers</div>
        </div>
        <div className="stat-card">
          <h4>📱 Mobile Orders</h4>
          <div className="stat-value">68%</div>
          <div className="stat-desc">Of total orders</div>
        </div>
        <div className="stat-card">
          <h4>⏰ Avg. Response Time</h4>
          <div className="stat-value">2.4min</div>
          <div className="stat-desc">Customer support</div>
        </div>
        <div className="stat-card">
          <h4>📊 Inventory Value</h4>
          <div className="stat-value">$287K</div>
          <div className="stat-desc">Current stock</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;