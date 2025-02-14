import React from 'react';
import Link from 'next/link';
import { Pizza, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

interface FooterProps {
  config: typeof siteConfig;
}

const Footer = ({ config }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Pizza className="h-6 w-6 text-red-500 mr-2" />
              <span className="text-xl font-bold">{config.name}</span>
            </div>
            <p className="text-gray-400">
              Authentic Philly-style pizza made with premium ingredients from Restaurant Depot.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#menu" className="text-gray-400 hover:text-white">Menu</Link></li>
              <li><Link href="#specials" className="text-gray-400 hover:text-white">Specials</Link></li>
              <li><Link href="#location" className="text-gray-400 hover:text-white">Location</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{config.contact.address.mall}</li>
              <li>{config.contact.address.location}</li>
              <li>{config.contact.phone}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href={config.contact.social.instagram} className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={config.contact.social.facebook} className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;