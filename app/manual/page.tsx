"use client";

import { type ReactElement } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  IngredientesSection,
  RecetasSection,
  PaquetesSection,
  PromocionesSection,
  ProcedimientosSection,
  CalidadSection,
} from "./components/Sections";

const translations = {
  en: {
    title: "Pizza Operations Manual - Food Court",
    subtitle: "Complete guide of procedures and standards",
    tableOfContents: "Table of Contents",
    backToTop: "↑ Top",
    sections: [
      {
        id: "ingredientes",
        title: "1. Ingredients and Costs",
      },
      {
        id: "recetas",
        title: "2. Base Recipes",
      },
      {
        id: "paquetes",
        title: "3. Party Packages",
      },
      {
        id: "promociones",
        title: "4. Promotions",
      },
      {
        id: "procedimientos",
        title: "5. Operating Procedures",
      },
      {
        id: "calidad",
        title: "6. Quality Control",
      },
    ],
  },
  es: {
    title: "Manual de Operaciones de Pizza - Food Court",
    subtitle: "Guía completa de procedimientos y estándares",
    tableOfContents: "Índice",
    backToTop: "↑ Subir",
    sections: [
      {
        id: "ingredientes",
        title: "1. Ingredientes y Costos",
      },
      {
        id: "recetas",
        title: "2. Recetas Base",
      },
      {
        id: "paquetes",
        title: "3. Paquetes para Fiestas",
      },
      {
        id: "promociones",
        title: "4. Promociones",
      },
      {
        id: "procedimientos",
        title: "5. Procedimientos Operativos",
      },
      {
        id: "calidad",
        title: "6. Control de Calidad",
      },
    ],
  },
};

interface Section {
  id: string;
  title: string;
  Component: () => ReactElement;
}

export default function Manual() {
  const { language } = useLanguage();
  const t = translations[language];

  const sections: Section[] = t.sections.map((section) => ({
    ...section,
    Component: {
      ingredientes: IngredientesSection,
      recetas: RecetasSection,
      paquetes: PaquetesSection,
      promociones: PromocionesSection,
      procedimientos: ProcedimientosSection,
      calidad: CalidadSection,
    }[section.id],
  }));

  return (
    <div className="max-w-7xl mx-auto p-6" suppressHydrationWarning>
      <div className="bg-gray-50 p-6 mb-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Table of Contents */}
      <nav className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">{t.tableOfContents}</h2>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {section.title}
            </h2>
            <section.Component />
          </section>
        ))}
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8">
        <a
          href="#"
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {t.backToTop}
        </a>
      </div>
    </div>
  );
}
