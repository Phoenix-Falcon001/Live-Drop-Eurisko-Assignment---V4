// This file contains API-related utilities and types

export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

export const defaultConfig: ApiConfig = {
  baseURL: 'https://live-drop-eurisko-assignment-v4.onrender.com/api',
  timeout: 10000
};

// API error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request utility
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config = {
    ...defaultConfig,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${config.baseURL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// API endpoints configuration
export const API_ENDPOINTS = {
  CUSTOMERS: {
    BY_EMAIL: (email: string) => `/customers?email=${encodeURIComponent(email)}`,
  },
  PRODUCTS: {
    LIST: '/products',
    BY_ID: (id: string) => `/products/${id}`,
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    BY_CUSTOMER: (customerId: string) => `/orders?customerId=${customerId}`,
  },
  ANALYTICS: {
    DAILY_REVENUE: '/analytics/daily-revenue',
  },
  DASHBOARD: {
    BUSINESS_METRICS: '/dashboard/business-metrics',
    ASSISTANT_STATS: '/dashboard/assistant-stats',
  },
  ASSISTANT: {
    CHAT: '/assistant/chat',
  }
};