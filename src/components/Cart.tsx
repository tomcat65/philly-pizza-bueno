"use client";

import React from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { getStripe } from '@/lib/stripe-client';
import { CartSkeleton } from '@/components/skeletons/cart-skeleton';

export const Cart = () => {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-red-600"
      >
        <ShoppingCart className="h-6 w-6" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
    );
  }

  if (loading) {
    return <CartSkeleton />
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:text-red-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.size} - {item.toppings.join(', ')}
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
                    <div className="text-right">
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
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};