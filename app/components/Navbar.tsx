"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Home, Pizza } from "lucide-react";

const translations = {
  en: {
    home: "Home",
    manual: "Manual",
    ingredients: "Ingredients",
  },
  es: {
    home: "Inicio",
    manual: "Manual",
    ingredients: "Ingredientes",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Pizza className="h-8 w-8 text-red-600" />
              <span className="text-lg font-semibold text-red-600">PhillyPizzaBueno</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <Home className="h-4 w-4 mr-1" />
              {t.home}
            </Link>
            <Link
              href="/manual"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/manual")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              {t.manual}
            </Link>
            <Link
              href="/ingredientes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/ingredientes")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              {t.ingredients}
            </Link>
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
            <Link
              href="/"
              className={`p-2 rounded-md ${
                isActive("/")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <Home className="h-5 w-5" />
            </Link>
            <Link
              href="/manual"
              className={`p-2 rounded-md text-sm font-medium ${
                isActive("/manual")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              {t.manual}
            </Link>
            <Link
              href="/ingredientes"
              className={`p-2 rounded-md text-sm font-medium ${
                isActive("/ingredientes")
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              {t.ingredients}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
