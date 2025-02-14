'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSkeleton } from '@/components/skeletons/hero-skeleton';

interface HeroProps {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
}

export default function HeroSection({ hero }: HeroProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const img = new Image();
    img.src = hero.image;
    img.onload = () => {
      setImageLoaded(true);
      setIsLoading(false);
    };
  }, [hero.image]);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt="Delicious pizza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl mb-8">{hero.subtitle}</p>
          <div className="flex space-x-4">
            <a 
              href="#menu"
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition flex items-center"
            >
              Order Now <ArrowRight className="ml-2" />
            </a>
            <a 
              href="#menu"
              className="bg-white text-red-600 px-8 py-3 rounded-full hover:bg-gray-100 transition"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}