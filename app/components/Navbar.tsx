"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Book, Pizza } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Reset loading state when pathname changes
  useEffect(() => {
    setIsLoading(null);
  }, [pathname]);

  const handleNavigation = async (href: string) => {
    if (href === pathname) return; // Don't navigate if already on the page
    setIsLoading(href);
    try {
      await router.push(href);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const links = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/manual", label: "Manual", icon: Book },
    { href: "/ingredientes", label: "Ingredientes", icon: Pizza },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-2 text-xl font-bold text-red-600 hover:text-red-700 transition-colors"
            disabled={isLoading !== null}
          >
            <Pizza className="w-6 h-6" />
            <span>PhillyPizzaBueno</span>
          </button>

          <div className="flex items-center space-x-1 sm:space-x-4">
            {links.map(({ href, label, icon: Icon }) => (
              <button
                key={href}
                onClick={() => handleNavigation(href)}
                className={`flex items-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                } ${isLoading === href ? "opacity-70 cursor-wait" : ""}`}
                disabled={isLoading !== null}
              >
                <Icon
                  className={`w-4 h-4 sm:mr-2 ${
                    isLoading === href ? "animate-spin" : ""
                  }`}
                />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
