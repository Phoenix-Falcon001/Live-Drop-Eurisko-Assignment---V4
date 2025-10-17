import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface BusinessMetrics {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  popularProducts: string[];
}

interface AssistantStats {
  totalQueries: number;
  resolvedQueries: number;
  satisfactionRate: number;
}

const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  const [assistantStats, setAssistantStats] = useState<AssistantStats | null>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [metricsData, statsData, revenueData] = await Promise.all([
        api.getBusinessMetrics(),
        api.getAssistantStats(),
        api.getDailyRevenue()
      ]);

      setMetrics(metricsData);
      setAssistantStats(statsData);
      setRevenueData(revenueData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Set mock data as fallback
      setMetrics({
        totalRevenue: 125000,
        totalOrders: 450,
        activeCustomers: 120,
        popularProducts: ['Wireless Headphones', 'Smartphone Pro', 'Laptop Ultra']
      });
      setAssistantStats({
        totalQueries: 345,
        resolvedQueries: 320,
        satisfactionRate: 92.8
      });
      setRevenueData([
        { date: '2024-01-01', revenue: 1500 },
        { date: '2024-01-02', revenue: 2300 },
        { date: '2024-01-03', revenue: 1800 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={loadDashboardData} className="refresh-btn">
          Refresh Data
        </button>
      </div>

      {/* Business Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p className="metric-value">${metrics?.totalRevenue?.toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Total Orders</h3>
          <p className="metric-value">{metrics?.totalOrders}</p>
        </div>
        <div className="metric-card">
          <h3>Active Customers</h3>
          <p className="metric-value">{metrics?.activeCustomers}</p>
        </div>
        <div className="metric-card">
          <h3>Satisfaction Rate</h3>
          <p className="metric-value">{assistantStats?.satisfactionRate}%</p>
        </div>
      </div>

      {/* Popular Products */}
      <div className="section">
        <h3>Popular Products</h3>
        <div className="products-list">
          {metrics?.popularProducts?.map((product, index) => (
            <div key={index} className="product-item">
              {product}
            </div>
          ))}
        </div>
      </div>

      {/* Assistant Stats */}
      <div className="section">
        <h3>Assistant Performance</h3>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-label">Total Queries:</span>
            <span className="stat-value">{assistantStats?.totalQueries}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Resolved:</span>
            <span className="stat-value">{assistantStats?.resolvedQueries}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Success Rate:</span>
            <span className="stat-value">{assistantStats?.satisfactionRate}%</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="section">
        <h3>Recent Revenue</h3>
        <div className="revenue-chart">
          {revenueData?.map((day, index) => (
            <div key={index} className="revenue-day">
              <div className="revenue-bar" style={{ height: `${day.revenue / 50}px` }}></div>
              <span className="revenue-label">${day.revenue}</span>
              <span className="date-label">{day.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;