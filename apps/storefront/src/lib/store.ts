import { create } from 'zustand';
import { Product } from './api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  cart: [],
  
  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.product._id === product._id);
      
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          cart: [...state.cart, { product, quantity: 1 }]
        };
      }
    });
  },
  
  removeFromCart: (productId: string) => {
    set((state) => ({
      cart: state.cart.filter(item => item.product._id !== productId)
    }));
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => ({
      cart: state.cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));