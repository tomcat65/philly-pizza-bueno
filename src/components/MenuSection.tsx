"use client";

import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { supabase } from '../lib/supabase';
import { Star } from 'lucide-react';
import type { Pizza as PizzaType } from '@/types/pizza';
import { MenuSkeleton } from '@/components/skeletons/menu-skeleton';

interface Size {
  size: number;
  name: string;
}

interface Sizes {
  personal: Size;
  regular: Size;
  family: Size;
}

interface Toppings {
  cheese: string[];
  meat: string[];
  veggies: string[];
}

interface ToppingOptions {
  amount: string[];
  style: string[];
}

interface ToppingSelection {
  name: string;
  amount: string;
  style?: string;
}

interface MenuSectionProps {
  pizzas: PizzaType[];
  sizes: {
    personal: { size: number; name: string };
    regular: { size: number; name: string };
    family: { size: number; name: string };
  };
  toppings: {
    cheese: string[];
    meat: string[];
    veggies: string[];
  };
  toppingOptions: {
    amount: string[];
    style: string[];
  };
}

export default function MenuSection({ sizes, toppings, toppingOptions }: MenuSectionProps) {
  const [pizzas, setPizzas] = React.useState<PizzaType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedPizza, setSelectedPizza] = React.useState<PizzaType | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<keyof typeof sizes>('regular');
  const [selectedToppings, setSelectedToppings] = React.useState<ToppingSelection[]>([]);
  const addItem = useCartStore(state => state.addItem);

  React.useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('/api/pizzas');
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = async (pizza: PizzaType) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      alert('Please sign in to add items to your cart');
      return;
    }

    await addItem({
      pizzaId: pizza.id || crypto.randomUUID(),
      size: selectedSize,
      quantity: 1,
      toppings: selectedToppings.map(t => `${t.name} (${t.amount}${t.style ? `, ${t.style}` : ''})`),
      price: pizza.prices[selectedSize],
      name: pizza.name,
      image: pizza.image_url || pizza.image
    });

    setSelectedPizza(null);
    setSelectedToppings([]);
  };

  const handleToppingSelection = (category: string, topping: string) => {
    const existingTopping = selectedToppings.find(t => t.name === topping);
    
    if (existingTopping) {
      setSelectedToppings(prev => prev.filter(t => t.name !== topping));
    } else {
      setSelectedToppings(prev => [...prev, {
        name: topping,
        amount: 'normal',
        style: category === 'veggies' ? 'fresh' : undefined
      }]);
    }
  };

  const updateToppingAmount = (topping: string, amount: string) => {
    setSelectedToppings(prev => prev.map(t => 
      t.name === topping ? { ...t, amount } : t
    ));
  };

  const updateToppingStyle = (topping: string, style: string) => {
    setSelectedToppings(prev => prev.map(t => 
      t.name === topping ? { ...t, style } : t
    ));
  };

  if (loading) {
    return <MenuSkeleton />;
  }

  const renderToppingCategory = (title: string, items: string[], category: keyof typeof toppings) => (
    <div className="mb-6">
      <h5 className="text-lg font-medium text-gray-700 mb-3">{title}</h5>
      <div className="space-y-4">
        {items.map(topping => {
          const isSelected = selectedToppings.some(t => t.name === topping);
          const toppingData = selectedToppings.find(t => t.name === topping);

          return (
            <div key={topping} className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToppingSelection(category, topping)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>{topping}</span>
              </label>
              
              {isSelected && (
                <div className="ml-6 space-y-3">
                  <div className="space-y-2">
                    <span className="text-sm text-gray-600 block">Amount:</span>
                    <div className="flex items-center space-x-4">
                      {toppingOptions.amount.map(amount => (
                        <label key={amount} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`amount-${topping}`}
                            value={amount}
                            checked={toppingData?.amount === amount}
                            onChange={() => updateToppingAmount(topping, amount)}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-sm capitalize">{amount}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {category === 'veggies' && (
                    <div className="space-y-2">
                      <span className="text-sm text-gray-600 block">Style:</span>
                      <div className="flex items-center space-x-4">
                        {toppingOptions.style.map(style => (
                          <label key={style} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`style-${topping}`}
                              value={style}
                              checked={toppingData?.style === style}
                              onChange={() => updateToppingStyle(topping, style)}
                              className="text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm capitalize">{style}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Pizza Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Made with our signature Philly crust, available in three sizes: 
            {sizes.personal.size}" ({sizes.personal.name}), {sizes.regular.size}" ({sizes.regular.name}), and {sizes.family.size}" ({sizes.family.name})
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={pizza.image_url}
                alt={pizza.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
                <p className="text-gray-600 mb-4">{pizza.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(sizes).map(([key, size]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedSize(key as keyof typeof sizes);
                        setSelectedPizza(pizza);
                      }}
                      className={`text-center p-2 rounded-lg transition ${
                        selectedPizza?.id === pizza.id && selectedSize === key
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-sm">{size.name} ({size.size}")</span>
                      <span className="block text-lg font-bold">${pizza.prices[key as keyof typeof sizes]}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPizza(pizza)}
                  className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                >
                  Customize & Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPizza && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" onClick={() => setSelectedPizza(null)}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customize Your Pizza</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-2">Size</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(sizes).map(([key, size]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedSize(key as keyof typeof sizes)}
                          className={`p-2 rounded-lg transition ${
                            selectedSize === key
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {size.name} ({size.size}")
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 max-h-96 overflow-y-auto">
                    {renderToppingCategory('Cheese', toppings.cheese, 'cheese')}
                    {renderToppingCategory('Meat Toppings', toppings.meat, 'meat')}
                    {renderToppingCategory('Veggie Toppings', toppings.veggies, 'veggies')}
                  </div>

                  <div className="mt-5 sm:mt-6 space-y-2">
                    <button
                      onClick={() => handleAddToCart(selectedPizza)}
                      className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                    >
                      Add to Cart - ${selectedPizza.prices[selectedSize]}
                    </button>
                    <button
                      onClick={() => setSelectedPizza(null)}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded-full hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Toppings</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-4">Cheese Options</h4>
              <ul className="space-y-2 text-gray-600">
                {toppings.cheese.map((topping) => (
                  <li key={topping}>• {topping}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-4">Meat Toppings</h4>
              <ul className="space-y-2 text-gray-600">
                {toppings.meat.map((topping) => (
                  <li key={topping}>• {topping}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-600 mb-4">Veggie Toppings</h4>
              <ul className="space-y-2 text-gray-600">
                {toppings.veggies.map((topping) => (
                  <li key={topping}>• {topping}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}