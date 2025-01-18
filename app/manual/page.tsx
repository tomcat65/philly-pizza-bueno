"use client";

import {
  IngredientesSection,
  RecetasSection,
  PaquetesSection,
  PromocionesSection,
  ProcedimientosSection,
  CalidadSection,
} from "./components/Sections";

interface Section {
  id: string;
  title: string;
  Component: () => JSX.Element;
}

export default function Manual() {
  const sections: Section[] = [
    {
      id: "ingredientes",
      title: "1. Ingredientes y Costos",
      Component: IngredientesSection,
    },
    {
      id: "recetas",
      title: "2. Recetas Base",
      Component: RecetasSection,
    },
    {
      id: "paquetes",
      title: "3. Paquetes para Fiestas",
      Component: PaquetesSection,
    },
    {
      id: "promociones",
      title: "4. Promociones",
      Component: PromocionesSection,
    },
    {
      id: "procedimientos",
      title: "5. Procedimientos Operativos",
      Component: ProcedimientosSection,
    },
    {
      id: "calidad",
      title: "6. Control de Calidad",
      Component: CalidadSection,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6" suppressHydrationWarning>
      <div className="bg-gray-50 p-6 mb-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2">
          Manual de Operaciones de Pizza - Food Court
        </h1>
        <p className="text-gray-600">
          Guía completa de procedimientos y estándares
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Índice</h2>
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
          ↑ Subir
        </a>
      </div>
    </div>
  );
}
