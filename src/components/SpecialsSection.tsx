import React from 'react';
import { Star } from 'lucide-react';

interface Special {
  name: string;
  description: string;
  price: number;
}

interface SpecialsSectionProps {
  specials: Special[];
}

const SpecialsSection = ({ specials }: SpecialsSectionProps) => {
  return (
    <section id="specials" className="py-20 bg-red-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Today's Specials</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Don't miss out on our amazing daily deals!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {specials.map((special) => (
            <div key={special.name} className="bg-white rounded-lg p-6 transform hover:scale-105 transition">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-gray-800 ml-2">{special.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {special.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">${special.price}</span>
                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialsSection;