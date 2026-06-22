'use client';

import { create } from 'zustand';
import { MenuItem, CartItem } from '@/types/menu';

interface CartStore {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => string;
}

export const useCart = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (item: MenuItem) => {
    const { cart } = get();
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id: string) => {
    const { cart } = get();
    set({ cart: cart.filter((i) => i.id !== id) });
  },

  updateQuantity: (id: string, quantity: number) => {
    const { cart } = get();
    if (quantity <= 0) {
      set({ cart: cart.filter((i) => i.id !== id) });
    } else {
      set({
        cart: cart.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      });
    }
  },

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => {
    const { cart } = get();
    const total = cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return acc + price * item.quantity;
    }, 0);
    return `₹${total}`;
  },
}));

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
