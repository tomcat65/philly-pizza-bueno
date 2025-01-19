"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

const navItems = {
  en: [
    { name: "Home", path: "/" },
    { name: "Manual", path: "/manual" },
    { name: "Ingredients", path: "/ingredientes" },
  ],
  es: [
    { name: "Inicio", path: "/" },
    { name: "Manual", path: "/manual" },
    { name: "Ingredientes", path: "/ingredientes" },
  ],
};

export function Navbar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center text-red-600 font-bold text-xl"
            >
              PhillyPizzaBueno
            </Link>
          </div>
          <div className="flex space-x-8">
            {navItems[language].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive(item.path)
                    ? "text-red-600 border-b-2 border-red-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
