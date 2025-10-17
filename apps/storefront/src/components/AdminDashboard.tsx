import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface BusinessMetrics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
}

interface AssistantStats {
  totalQueries: number;
  intentDistribution: Record<string, number>;
  functionCalls: Record<string, number>;
  avgResponseTime: string;
}

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null);
  const [assistantStats, setAssistantStats] = useState<AssistantStats | null>(null);
  const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [metricsData, statsData, revenueData] = await Promise.all([
        api.getBusinessMetrics(),
        api.getAssistantStats(),
        api.getDailyRevenue()
      ]);

      setMetrics(metricsData);
      setAssistantStats(statsData);
      setDailyRevenue(revenueData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Business Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <div className="metric-value">
            ${metrics?.totalRevenue?.toLocaleString() || '0'}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Total Orders</h3>
          <div className="metric-value">
            {metrics?.totalOrders?.toLocaleString() || '0'}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Average Order Value</h3>
          <div className="metric-value">
            ${metrics?.avgOrderValue?.toFixed(2) || '0'}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Assistant Queries</h3>
          <div className="metric-value">
            {assistantStats?.totalQueries?.toLocaleString() || '0'}
          </div>
        </div>
      </div>

      {/* Assistant Analytics */}
      <div className="analytics-section">
        <h2>Assistant Analytics</h2>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h4>Intent Distribution</h4>
            <div className="intent-list">
              {assistantStats && Object.entries(assistantStats.intentDistribution).map(([intent, count]) => (
                <div key={intent} className="intent-item">
                  <span className="intent-name">{intent.replace('_', ' ')}</span>
                  <span className="intent-count">{count} queries</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h4>Function Calls</h4>
            <div className="function-list">
              {assistantStats && Object.entries(assistantStats.functionCalls).map(([func, count]) => (
                <div key={func} className="function-item">
                  <span className="function-name">{func}</span>
                  <span className="function-count">{count} calls</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="performance-metrics">
          <div className="performance-item">
            <strong>Average Response Time:</strong> {assistantStats?.avgResponseTime}
          </div>
        </div>
      </div>

      {/* Recent Revenue */}
      <div className="revenue-section">
        <h2>Daily Revenue</h2>
        <div className="revenue-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {dailyRevenue.slice(0, 7).map((day, index) => (
                <tr key={index}>
                  <td>{new Date(day._id?.year, (day._id?.month || 1) - 1, day._id?.day).toLocaleDateString()}</td>
                  <td>${day.revenue?.toFixed(2)}</td>
                  <td>{day.orderCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};