"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

const translations = {
  en: {
    hero: {
      title: "PhillyPizzaBueno",
      subtitle:
        "Management and operations control system for your pizza business",
    },
    cards: {
      manual: {
        title: "Procedures Manual",
        description:
          "Access the complete guide of operations, recipes, and procedures to maintain quality and efficiency.",
        action: "View Manual",
      },
      ingredients: {
        title: "Ingredients & Products",
        description:
          "Explore our catalog of ingredients, prices and specifications for successful operation.",
        action: "View Ingredients",
      },
    },
    footer: {
      copyright: "© 2024 PhillyPizzaBueno. All rights reserved.",
    },
  },
  es: {
    hero: {
      title: "PhillyPizzaBueno",
      subtitle:
        "Sistema de gestión y control de operaciones para tu negocio de pizzas",
    },
    cards: {
      manual: {
        title: "Manual de Procedimientos",
        description:
          "Acceda a la guía completa de operaciones, recetas y procedimientos para mantener la calidad y eficiencia.",
        action: "Ver Manual",
      },
      ingredients: {
        title: "Ingredientes y Productos",
        description:
          "Explore nuestro catálogo de ingredientes, precios y especificaciones para una operación exitosa.",
        action: "Ver Ingredientes",
      },
    },
    footer: {
      copyright: "© 2024 PhillyPizzaBueno. Todos los derechos reservados.",
    },
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Card */}
          <Link
            href="/manual"
            className="group relative bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition-all duration-300 border border-gray-200"
          >
            <div className="absolute top-4 right-4 text-red-600">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {t.cards.manual.title}
            </h2>
            <p className="text-gray-600 mb-4 pr-8">
              {t.cards.manual.description}
            </p>
            <div className="inline-flex items-center text-red-600 font-medium">
              {t.cards.manual.action}
              <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Ingredientes Card */}
          <Link
            href="/ingredientes"
            className="group relative bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition-all duration-300 border border-gray-200"
          >
            <div className="absolute top-4 right-4 text-red-600">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {t.cards.ingredients.title}
            </h2>
            <p className="text-gray-600 mb-4 pr-8">
              {t.cards.ingredients.description}
            </p>
            <div className="inline-flex items-center text-red-600 font-medium">
              {t.cards.ingredients.action}
              <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/90 text-sm">{t.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
