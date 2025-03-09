"use client";

import React from 'react';
import { Star, AlertCircle, RefreshCw, Plus, Minus, X } from 'lucide-react';
import useSWR from 'swr';
import { useCartStore } from '@/stores/cartStore';
import { supabase } from '@/lib/supabase';
import type { CartItem } from '@/types/cart';

interface Special {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface SpecialsSectionProps {
  specials?: Special[];
}

// Fetcher function for SWR
const specialsFetcher = async (url: string) => {
  const response = await fetch(url);
  
  // Handle HTTP errors
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.message = `HTTP Error: ${response.status} - ${response.statusText}`;
    throw error;
  }
  
  const data = await response.json();
  return data;
};

// Fetcher for toppings
const toppingsFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch toppings');
  }
  return response.json();
};

const SpecialsSection = ({ specials = [] }: SpecialsSectionProps) => {
  // Use SWR for data fetching with caching and revalidation
  const { data: specialsData, error, isLoading, isValidating, mutate } = useSWR<Special[]>(
    '/api/specials',
    specialsFetcher,
    {
      // Use initial data if available
      fallbackData: specials.length ? specials : undefined,
      // Revalidate every 5 minutes
      refreshInterval: 300000,
      // Retry failed requests with exponential backoff
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Only retry up to 3 times
        if (retryCount >= 3) return;
        
        // Exponential backoff with 2^retryCount * 1000ms
        const delay = Math.min(1000 * 2 ** retryCount, 30000);
        setTimeout(() => revalidate({ retryCount }), delay);
      },
      // Deduplicate requests within a 2-second window
      dedupingInterval: 2000
    }
  );

  // Fetch toppings data
  const { data: toppingData } = useSWR('/api/toppings?type=pizza', toppingsFetcher);

  // State for topping selection modal
  const [showToppingModal, setShowToppingModal] = React.useState(false);
  const [selectedSpecial, setSelectedSpecial] = React.useState<Special | null>(null);
  const [selectedToppings, setSelectedToppings] = React.useState<string[]>([]);
  
  // Reference to cart store
  const addItem = useCartStore(state => state.addItem);

  // Handle Order Now button click
  const handleOrderNow = (special: Special) => {
    // Check if it's the Quick Lunch Deal that needs topping selection
    if (special.name === "Quick Lunch Deal") {
      setSelectedSpecial(special);
      setSelectedToppings([]);
      setShowToppingModal(true);
    } else {
      // For other specials, attempt to add directly to cart
      addSpecialToCart(special);
    }
  };

  // Add a special to the cart
  const addSpecialToCart = (special: Special, customToppings: string[] = []) => {
    // Determine the details based on the special
    let pizzaId = '';
    let size: CartItem['size'] = 'regular';
    let name = special.name;
    let toppings: string[] = [];
    let image = 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80';

    // Set appropriate values based on the special
    switch(special.name) {
      case "Philly Meat Lovers":
        size = 'family';
        toppings = ['Pepperoni (normal)', 'Philly Beef (normal)', 'Bacon (normal)', 'Philly Chicken (normal)'];
        name = "Classic Cheese Pizza - Philly Meat Lovers Special";
        break;
      case "Quick Lunch Deal":
        size = 'personal';
        toppings = customToppings.map(t => `${t} (normal)`);
        name = "Classic Cheese Pizza - Quick Lunch Special";
        break;
      case "3-Cheese Special":
        size = 'regular';
        toppings = ['Mushrooms (normal, fresh)', 'Onions (normal, fresh)'];
        name = "3-Cheese Blend Pizza - Special";
        break;
      case "Philly Veggie Delight":
        size = 'family';
        toppings = [
          'Green Peppers (normal, fresh)', 
          'Mushrooms (normal, fresh)', 
          'Onions (normal, fresh)', 
          'Roma Tomatoes (normal, fresh)'
        ];
        name = "Classic Cheese Pizza - Philly Veggie Delight Special";
        break;
      case "Philly Double Deal":
        size = 'regular';
        name = "2x Classic Cheese Pizza - Special Deal";
        break;
    }

    // Add to cart - no authentication required
    addItem({
      pizzaId: pizzaId || crypto.randomUUID(),
      size,
      quantity: 1,
      toppings,
      price: special.price,
      name,
      image
    });

    // Close modal if open
    if (showToppingModal) {
      setShowToppingModal(false);
      setSelectedSpecial(null);
    }
  };

  // Toggle topping selection
  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(prev => prev.filter(t => t !== topping));
    } else {
      // Only allow selecting up to 2 toppings
      if (selectedToppings.length < 2) {
        setSelectedToppings(prev => [...prev, topping]);
      }
    }
  };

  // Handle loading state
  if (isLoading && !specialsData?.length) {
    return (
      <section id="specials" className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Today's Specials</h2>
          <div className="bg-white/10 p-12 rounded animate-pulse">
            <p className="text-white">Loading today's specials...</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error && !specialsData?.length) {
    return (
      <section id="specials" className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Today's Specials</h2>
          <div className="bg-white/10 p-8 rounded">
            <div className="flex justify-center mb-4">
              <AlertCircle className="text-white w-12 h-12" />
            </div>
            <p className="text-white mb-4">
              Sorry, we couldn't load today's specials.
            </p>
            <button 
              onClick={() => mutate()} 
              className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-gray-100 transition flex items-center mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!specialsData?.length) {
    return (
      <section id="specials" className="py-20 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Today's Specials</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Check back soon for our amazing daily deals!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="specials" className="py-20 bg-red-600 relative">
      {/* Show subtle loading indicator when revalidating */}
      {isValidating && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-xs text-gray-900 px-3 py-1 rounded-full flex items-center animate-pulse">
          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
          Updating...
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Today's Specials</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Don't miss out on our amazing daily deals!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {specialsData.map((special) => (
            <div key={special.id} className="bg-white rounded-lg p-6 transform hover:scale-105 transition">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-800 ml-2">{special.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {special.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">${special.price.toFixed(2)}</span>
                <button 
                  onClick={() => handleOrderNow(special)}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topping Selection Modal */}
      {showToppingModal && selectedSpecial && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Select Two Toppings</h3>
              <button 
                onClick={() => setShowToppingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Choose up to 2 toppings for your {selectedSpecial.name}
            </p>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Selected: {selectedToppings.length}/2</h4>
              <div className="grid grid-cols-2 gap-2">
                {toppingData?.toppings?.cheese && (
                  <div className="mb-4">
                    <h5 className="font-medium text-red-600 mb-2">Cheese</h5>
                    <ul className="space-y-2">
                      {toppingData.toppings.cheese.map((topping: string) => (
                        <li key={topping} className="flex items-center">
                          <button
                            onClick={() => toggleTopping(topping)}
                            className={`w-full text-left p-2 rounded-md flex items-center justify-between ${
                              selectedToppings.includes(topping)
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            disabled={selectedToppings.length >= 2 && !selectedToppings.includes(topping)}
                          >
                            <span>{topping}</span>
                            {selectedToppings.includes(topping) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {toppingData?.toppings?.meat && (
                  <div className="mb-4">
                    <h5 className="font-medium text-red-600 mb-2">Meat</h5>
                    <ul className="space-y-2">
                      {toppingData.toppings.meat.map((topping: string) => (
                        <li key={topping} className="flex items-center">
                          <button
                            onClick={() => toggleTopping(topping)}
                            className={`w-full text-left p-2 rounded-md flex items-center justify-between ${
                              selectedToppings.includes(topping)
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            disabled={selectedToppings.length >= 2 && !selectedToppings.includes(topping)}
                          >
                            <span>{topping}</span>
                            {selectedToppings.includes(topping) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {toppingData?.toppings?.veggies && (
                  <div className="mb-4 col-span-2">
                    <h5 className="font-medium text-red-600 mb-2">Veggies</h5>
                    <ul className="grid grid-cols-2 gap-2">
                      {toppingData.toppings.veggies.map((topping: string) => (
                        <li key={topping} className="flex items-center">
                          <button
                            onClick={() => toggleTopping(topping)}
                            className={`w-full text-left p-2 rounded-md flex items-center justify-between ${
                              selectedToppings.includes(topping)
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            disabled={selectedToppings.length >= 2 && !selectedToppings.includes(topping)}
                          >
                            <span>{topping}</span>
                            {selectedToppings.includes(topping) ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setShowToppingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => addSpecialToCart(selectedSpecial, selectedToppings)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedToppings.length === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecialsSection;