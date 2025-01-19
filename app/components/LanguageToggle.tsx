"use client";

import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors flex items-center space-x-2"
    >
      <Globe className="w-5 h-5" />
      <span>{language === "en" ? "Español" : "English"}</span>
    </button>
  );
}
