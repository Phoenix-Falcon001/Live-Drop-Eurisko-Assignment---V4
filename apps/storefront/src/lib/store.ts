import { create } from 'zustand';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stock: number;
}

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
    const state = get();
    const existingItem = state.cart.find(item => item.product._id === product._id);
    
    if (existingItem) {
      set({
        cart: state.cart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      set({
        cart: [...state.cart, { product, quantity: 1 }]
      });
    }
  },
  
  removeFromCart: (productId: string) => {
    const state = get();
    set({
      cart: state.cart.filter(item => item.product._id !== productId)
    });
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    const state = get();
    set({
      cart: state.cart.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    });
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  getTotalItems: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));