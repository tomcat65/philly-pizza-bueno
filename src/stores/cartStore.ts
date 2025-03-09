import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { CartStore, CartItem } from '@/types/cart';
import type { StateCreator } from 'zustand';

const createCartStore: StateCreator<CartStore> = (set, get) => ({
  items: [],
  total: 0,
  isCheckingOut: false,

  addItem: (item) => {
    const id = crypto.randomUUID();
    const newItem = { ...item, id };
    
    set(state => ({
      items: [...state.items, newItem],
      total: state.total + (item.price * item.quantity)
    }));

    // Sync with database if user is logged in
    syncCartWithDatabase();
  },

  removeItem: (id: string) => {
    const item = get().items.find(i => i.id === id);
    if (!item) return;

    set(state => ({
      items: state.items.filter(i => i.id !== id),
      total: state.total - (item.price * item.quantity)
    }));

    // Sync with database if user is logged in
    syncCartWithDatabase();
  },

  updateQuantity: (id: string, quantity: number) => {
    set(state => {
      const item = state.items.find(i => i.id === id);
      if (!item) return state;

      const items = quantity === 0
        ? state.items.filter(i => i.id !== id)
        : state.items.map(i => i.id === id ? { ...i, quantity } : i);

      const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

      return { items, total };
    });

    // Sync with database if user is logged in
    syncCartWithDatabase();
  },

  clearCart: () => {
    set({ items: [], total: 0 });

    // Sync with database if user is logged in
    syncCartWithDatabase();
  },

  fetchCart: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);

    if (data && data.length > 0) {
      const items = data as CartItem[];
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ items, total });
    }
  },

  syncCartToDatabase: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    try {
      // First, clear existing cart items
      await supabase.from('cart_items').delete().eq('user_id', user.id);
      
      // Then add current items
      const items = get().items;
      if (items.length > 0) {
        const dbItems = items.map(item => ({
          id: item.id,
          user_id: user.id,
          pizzaId: item.pizzaId,
          size: item.size,
          quantity: item.quantity,
          toppings: item.toppings,
          price: item.price,
          name: item.name,
          image: item.image
        }));
        
        await supabase.from('cart_items').insert(dbItems);
      }
      return true;
    } catch (error) {
      console.error('Error syncing cart to database:', error);
      return false;
    }
  },

  setCheckingOut: (isCheckingOut: boolean) => {
    set({ isCheckingOut });
  }
});

// Helper function to sync cart changes with database if user is logged in
const syncCartWithDatabase = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const store = useCartStore.getState();
    await store.syncCartToDatabase();
  }
};

// Use persist middleware to save cart in localStorage
export const useCartStore = create<CartStore>()(
  persist(
    createCartStore,
    {
      name: 'pizza-cart',
      partialize: (state) => ({ 
        items: state.items,
        total: state.total 
      }),
    }
  )
);