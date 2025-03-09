"use client";

import React, { useEffect } from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { CartSkeleton } from '@/components/skeletons/cart-skeleton';

// Create a context to share the cart open state
export const CartContext = React.createContext<{
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}>({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const useCart = () => React.useContext(CartContext);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
      <Cart />
    </CartContext.Provider>
  );
};

export const Cart = () => {
  const { items, total, removeItem, updateQuantity, syncCartToDatabase, setCheckingOut, isCheckingOut } = useCartStore();
  const { isCartOpen, setIsCartOpen } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [authRequired, setAuthRequired] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Show auth required dialog
        setAuthRequired(true);
        setCheckingOut(true);
        setLoading(false);
        return;
      }

      // Sync cart with database before checkout
      await syncCartToDatabase();
      
      const formData = new FormData();
      formData.append('items', JSON.stringify(items.map(item => ({
        name: item.name,
        description: `${item.size} - ${item.toppings.join(', ')}`,
        amount: Math.round(item.price * 100),
        quantity: item.quantity
      }))))

      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      setLoading(false);
    }
  };

  // Check if user logged in after redirect
  React.useEffect(() => {
    const checkAuth = async () => {
      if (isCheckingOut) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // User is now logged in, continue with checkout
          setAuthRequired(false);
          setCheckingOut(false);
          handleCheckout();
        }
      }
    };

    checkAuth();
  }, [isCheckingOut]);

  // Listen for auth state changes
  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' && isCheckingOut) {
        // User signed in, continue with checkout
        syncCartToDatabase();
        handleCheckout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isCheckingOut]);

  // For header cart icon - hidden on small screens
  const HeaderCartIcon = () => (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 text-gray-600 hover:text-red-600 hidden md:block"
      aria-label="Open cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </button>
  );

  if (loading) {
    return <CartSkeleton />;
  }

  // Cart is closed, just return the header icon
  if (!isCartOpen) {
    return <HeaderCartIcon />;
  }

  // Full cart UI when open
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={() => {
          if (!authRequired) setIsCartOpen(false);
        }} 
      />
      
      {/* Make the cart full-screen on mobile */}
      <div className="absolute md:right-0 inset-0 md:inset-auto md:top-0 md:h-full md:w-full md:max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          {!authRequired && (
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-red-600">
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {authRequired ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold mb-4 text-center">Sign in to complete your order</h3>
            <p className="text-gray-600 mb-6 text-center">
              You need to be signed in to checkout. Your cart items will be saved to your account.
            </p>
            <div className="flex flex-col w-full max-w-xs space-y-4">
              <button 
                onClick={async () => {
                  await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: `${window.location.origin}/auth/callback`
                    }
                  });
                }}
                className="w-full bg-white border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
              <button 
                onClick={() => {
                  setAuthRequired(false);
                  setCheckingOut(false);
                }}
                className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-center text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-red-600 hover:text-red-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.size} - {item.toppings.length > 0 ? item.toppings.join(', ') : 'No toppings'}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:text-red-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-red-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto flex justify-between sm:block">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 pt-6 pb-8">
                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-xl">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-red-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};