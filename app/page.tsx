import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              PhillyPizzaBueno
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-3xl mx-auto">
              Sistema de gestión y control de operaciones para tu negocio de
              pizzas
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-red-500 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Card */}
          <Link
            href="/manual"
            className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 bg-red-600 text-white p-4 rounded-tr-2xl rounded-bl-2xl">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Manual de Procedimientos
            </h2>
            <p className="text-gray-600 mb-6">
              Accede a la guía completa de operaciones, recetas, y
              procedimientos estándar para mantener la calidad y eficiencia.
            </p>
            <div className="flex items-center text-red-600 font-semibold">
              Ver Manual
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Ingredientes Card */}
          <Link
            href="/ingredientes"
            className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 bg-red-600 text-white p-4 rounded-tr-2xl rounded-bl-2xl">
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ingredientes y Productos
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestro catálogo de ingredientes, precios y
              especificaciones para una gestión eficiente del inventario.
            </p>
            <div className="flex items-center text-red-600 font-semibold">
              Ver Ingredientes
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-100">
            © 2024 PhillyPizzaBueno. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
