'use client';

import React from 'react';
import { Home, Menu, Star, MapPin, User, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import { useCart } from './Cart';

const MobileBottomNav = () => {
  const [user, setUser] = React.useState<any>(null);
  const { items } = useCartStore();
  const { setIsCartOpen } = useCart();
  
  // Check if user is logged in
  React.useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="relative">
        {/* Prominent Cart Button (positioned above the navigation bar) */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setIsCartOpen(true)} 
            className="flex items-center justify-center bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition relative"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-red-600">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center justify-between h-16 px-6">
          <a 
            href="#" 
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </a>
          
          <a 
            href="#menu" 
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600"
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs">Menu</span>
          </a>
          
          {/* Empty center div to create space for the cart button */}
          <div className="w-16"></div>
          
          <a 
            href="#specials" 
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600"
          >
            <Star className="h-5 w-5 mb-1" />
            <span className="text-xs">Specials</span>
          </a>
          
          <a 
            href="#location" 
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600"
          >
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs">Location</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav; 