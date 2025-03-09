'use client';

import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { AuthButton } from '@/components/AuthButton';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 text-gray-600 hover:text-red-600"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-red-600"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col space-y-6">
              {/* Contact Info Section */}
              <div className="space-y-4 border-b pb-6">
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-red-600" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-red-600" />
                  <div>
                    <p>{siteConfig.contact.address.mall}</p>
                    <p>{siteConfig.contact.address.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-red-600" />
                  <div>
                    <p>Open Daily {siteConfig.contact.hours}</p>
                    <p>{siteConfig.contact.daysOpen}</p>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <a 
                href="#menu" 
                className="text-xl font-semibold py-2 border-b"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </a>
              <a 
                href="#specials" 
                className="text-xl font-semibold py-2 border-b"
                onClick={() => setIsOpen(false)}
              >
                Today's Specials
              </a>
              <a 
                href="#location" 
                className="text-xl font-semibold py-2 border-b"
                onClick={() => setIsOpen(false)}
              >
                Location
              </a>
              
              {/* Authentication */}
              <div className="mt-4">
                <div className="flex justify-center">
                  <AuthButton />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav; 