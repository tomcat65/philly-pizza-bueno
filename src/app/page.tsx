import { Suspense } from 'react';
import { siteConfig } from '@/config/siteConfig';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import SpecialsSection from '@/components/SpecialsSection';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection hero={siteConfig.hero} />
        <Suspense fallback={<div className="py-20 text-center">Loading menu...</div>}>
          <MenuSection 
            pizzas={siteConfig.pizzas} 
            sizes={siteConfig.sizes} 
            toppings={siteConfig.toppings}
            toppingOptions={siteConfig.toppingOptions}
          />
        </Suspense>
        <SpecialsSection specials={siteConfig.specials} />
        <LocationSection contact={siteConfig.contact} />
      </main>
      <Footer config={siteConfig} />
    </div>
  );
}