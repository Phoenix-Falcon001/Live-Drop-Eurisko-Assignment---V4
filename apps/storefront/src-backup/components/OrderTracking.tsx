import React, { useState, useEffect } from 'react';
import { api, Order } from '../lib/api';
import { sseClient } from '../lib/sse-client';

interface OrderTrackingProps {
  orderId: string;
  customerId: string;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, customerId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const statusSteps = [
    { status: 'PENDING', label: 'Order Placed', description: 'Your order has been received' },
    { status: 'PROCESSING', label: 'Processing', description: 'Preparing your order for shipment' },
    { status: 'SHIPPED', label: 'Shipped', description: 'Your order is on the way' },
    { status: 'DELIVERED', label: 'Delivered', description: 'Order successfully delivered' }
  ];

  useEffect(() => {
    fetchOrder();
    setupSSE();

    return () => {
      sseClient.disconnect();
    };
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const orderData = await api.getOrder(orderId);
      setOrder(orderData);
      setLiveStatus(orderData.status);
    } catch (err) {
      setError('Order not found');
    } finally {
      setLoading(false);
    }
  };

  const setupSSE = () => {
    sseClient.connectToOrderStream(
      orderId,
      (data) => {
        setLiveStatus(data.status);
        if (data.order) {
          setOrder(data.order);
        }
      },
      (error) => {
        console.error('SSE connection error:', error);
      }
    );
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.status === status);
  };

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div className="error">Order not found</div>;

  const currentStatusIndex = getStatusIndex(liveStatus);

  return (
    <div className="order-tracking">
      <h2>Order Tracking #{orderId.slice(-8)}</h2>
      
      <div className="order-summary">
        <div className="summary-item">
          <strong>Status:</strong> 
          <span className={`status-badge ${liveStatus.toLowerCase()}`}>
            {liveStatus}
          </span>
        </div>
        <div className="summary-item">
          <strong>Total:</strong> ${order.totalAmount}
        </div>
        <div className="summary-item">
          <strong>Items:</strong> {order.items.length}
        </div>
        <div className="summary-item">
          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="tracking-timeline">
        <h3>Order Progress</h3>
        <div className="timeline">
          {statusSteps.map((step, index) => (
            <div 
              key={step.status}
              className={`timeline-step ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'current' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStatusIndex ? '✓' : index + 1}
              </div>
              <div className="step-info">
                <div className="step-label">{step.label}</div>
                <div className="step-description">{step.description}</div>
              </div>
              {index < statusSteps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-name">{item.name}</div>
            <div className="item-quantity">Qty: {item.quantity}</div>
            <div className="item-price">${item.price}</div>
          </div>
        ))}
      </div>

      {liveStatus === 'DELIVERED' && (
        <div className="delivery-complete">
          🎉 Your order has been delivered! Thank you for shopping with us.
        </div>
      )}
    </div>
  );
};