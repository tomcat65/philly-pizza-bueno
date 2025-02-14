import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { CartStore, CartItem } from '@/types/cart';
import type { StateCreator } from 'zustand';

const createCartStore: StateCreator<CartStore> = (set, get) => ({
  items: [],
  total: 0,

  addItem: async (item) => {
    const id = crypto.randomUUID();
    const newItem = { ...item, id };
    
    set(state => ({
      items: [...state.items, newItem],
      total: state.total + (item.price * item.quantity)
    }));

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('cart_items').insert({
        id,
        user_id: user.id,
        ...item
      });
    }
  },

  removeItem: async (id: string) => {
    const item = get().items.find(i => i.id === id);
    if (!item) return;

    set(state => ({
      items: state.items.filter(i => i.id !== id),
      total: state.total - (item.price * item.quantity)
    }));

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('cart_items').delete().eq('id', id);
    }
  },

  updateQuantity: async (id: string, quantity: number) => {
    set(state => {
      const item = state.items.find(i => i.id === id);
      if (!item) return state;

      const items = quantity === 0
        ? state.items.filter(i => i.id !== id)
        : state.items.map(i => i.id === id ? { ...i, quantity } : i);

      const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

      return { items, total };
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      if (quantity === 0) {
        await supabase.from('cart_items').delete().eq('id', id);
      } else {
        await supabase.from('cart_items').update({ quantity }).eq('id', id);
      }
    }
  },

  clearCart: async () => {
    set({ items: [], total: 0 });

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    }
  },

  fetchCart: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);

    if (data) {
      const items = data as CartItem[];
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      set({ items, total });
    }
  }
});

export const useCartStore = create<CartStore>(createCartStore);