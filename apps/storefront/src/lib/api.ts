const API_BASE_URL = 'http://localhost:5000/api';

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stock: number;
}

export interface Order {
  _id: string;
  customerId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  totalAmount: number;
  shippingAddress: any;
  createdAt: string;
  updatedAt: string;
}

export interface AssistantResponse {
  response: string;
  intent: string;
  citations: string[];
  isValid: boolean;
  timestamp: string;
}

export const api = {
  // Customers
  async getCustomerByEmail(email: string): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers?email=${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Customer not found');
    return response.json();
  },

  // Products
  async getProducts(search?: string, tag?: string): Promise<{ products: Product[] }> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (tag) params.append('tag', tag);
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    return response.json();
  },

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  // Orders
  async createOrder(orderData: any): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Order not found');
    return response.json();
  },

  async getCustomerOrders(customerId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders?customerId=${customerId}`);
    return response.json();
  },

  // Analytics
  async getDailyRevenue(from?: string, to?: string): Promise<any[]> {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    
    const response = await fetch(`${API_BASE_URL}/analytics/daily-revenue?${params}`);
    return response.json();
  },

  // Dashboard
  async getBusinessMetrics(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/dashboard/business-metrics`);
    return response.json();
  },

  async getAssistantStats(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/dashboard/assistant-stats`);
    return response.json();
  },

  // Assistant
  async chatWithAssistant(message: string, context: any = {}): Promise<AssistantResponse> {
    const response = await fetch(`${API_BASE_URL}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context })
    });
    if (!response.ok) throw new Error('Assistant service unavailable');
    return response.json();
  }
};