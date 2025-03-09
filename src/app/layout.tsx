import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/siteConfig';
import { Phone, MapPin, Clock, Pizza, Menu } from 'lucide-react';
import { AuthButton } from '@/components/AuthButton';
import { CartProvider } from '@/components/Cart';
import MobileNav from '@/components/MobileNav';
import MobileBottomNav from '@/components/MobileBottomNav';
import SWRProvider from '@/lib/swr-provider';
import React from 'react';

// Initialize the Inter font with subsets and display settings
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: 'Authentic Philly-Style Pizza',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { 
        rel: 'mask-icon', 
        url: '/icons/safari-pinned-tab.svg',
        color: '#dc2626'
      },
      {
        rel: 'manifest',
        url: '/manifest.json'
      },
      {
        rel: 'shortcut icon',
        url: '/favicon.svg'
      },
      {
        rel: 'msapplication-config',
        url: '/browserconfig.xml'
      }
    ],
  },
  // Specify theme colors for browser tabs (primarily for mobile)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#dc2626' },
    { media: '(prefers-color-scheme: dark)', color: '#dc2626' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <SWRProvider>
          <CartProvider>
            {/* Top info bar - collapsible on mobile */}
            <div className="bg-red-700 text-white py-2 hidden sm:block">
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
            </div>
            
            {/* Main header with responsive design */}
            <header className="bg-white shadow-md sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  {/* Logo section */}
                  <div className="flex items-center">
                    <Pizza className="h-8 w-8 text-red-600 mr-2" />
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">{siteConfig.name}</h1>
                  </div>
                  
                  {/* Desktop navigation */}
                  <nav className="hidden md:flex items-center space-x-8">
                    <a href="#menu" className="text-gray-600 hover:text-red-600">Menu</a>
                    <a href="#specials" className="text-gray-600 hover:text-red-600">Specials</a>
                    <a href="#location" className="text-gray-600 hover:text-red-600">Location</a>
                    <div className="flex items-center space-x-2">
                      <AuthButton />
                    </div>
                  </nav>
                  
                  {/* Mobile navigation button */}
                  <div className="flex items-center md:hidden">
                    <MobileNav />
                  </div>
                </div>
              </div>
            </header>
            
            {/* Add padding to the bottom for mobile to account for bottom navigation */}
            <main className="pb-16 md:pb-0">
              {children}
            </main>
            
            {/* Mobile bottom navigation */}
            <MobileBottomNav />
          </CartProvider>
        </SWRProvider>
      </body>
    </html>
  );
}