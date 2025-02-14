"use client";

import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/stores/cartStore';

export const AuthButton = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const fetchCart = useCartStore(state => state.fetchCart);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchCart();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCart();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchCart]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo123'
      });
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button disabled className="text-gray-400 p-2">
        <User className="h-6 w-6" />
      </button>
    );
  }

  if (user) {
    return (
      <button
        onClick={handleSignOut}
        className="text-gray-600 hover:text-red-600 p-2"
        title="Sign Out"
      >
        <LogOut className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="text-gray-600 hover:text-red-600 p-2"
      title="Sign In"
    >
      <LogIn className="h-6 w-6" />
    </button>
  );
};