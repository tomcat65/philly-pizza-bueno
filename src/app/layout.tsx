import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Pizza, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { AuthButton } from '@/components/AuthButton';
import { Cart } from '@/components/Cart';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PhillyPizzaBueno - Authentic Philly-Style Pizza',
  description: 'Experience the perfect blend of Philadelphia tradition and Italian flavor at Philadelphia Mills Mall. Order authentic Philly-style pizza with premium ingredients.',
  keywords: 'pizza, philadelphia, philly pizza, italian food, pizza delivery, philadelphia mills mall',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-red-700 text-white py-2">
          <div className="container mx-auto px-4 flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{siteConfig.contact.address.mall} {siteConfig.contact.address.location}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>Open Daily {siteConfig.contact.hours}</span>
            </div>
          </div>
        </nav>
        
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Pizza className="h-8 w-8 text-red-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">{siteConfig.name}</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#menu" className="text-gray-600 hover:text-red-600">Menu</a>
                <a href="#specials" className="text-gray-600 hover:text-red-600">Specials</a>
                <a href="#location" className="text-gray-600 hover:text-red-600">Location</a>
                <div className="flex items-center space-x-2">
                  <AuthButton />
                  <Cart />
                </div>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}