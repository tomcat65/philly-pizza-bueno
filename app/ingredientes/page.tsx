"use client";

import { type ReactElement } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { ProductCard } from "../components/ProductCard";
import { MenuItem } from "../components/MenuItem";

const translations = {
  en: {
    title: "Base Ingredients",
    crusts: {
      title: "Philly Crusts",
      masa10: {
        name: 'Philly Crust 10"',
        unitCost: "Cost per unit: $1.52",
        boxCost: "Cost per box: $36.52",
        units: "24 units per box",
      },
      masa12: {
        name: 'Philly Crust 12"',
        unitCost: "Cost per unit: $1.77",
        boxCost: "Cost per box: $42.40",
        units: "24 units per box",
      },
      masa16: {
        name: 'Philly Crust 16"',
        unitCost: "Cost per unit: $2.51",
        boxCost: "Cost per box: $60.24",
        units: "24 units per box",
      },
    },
    cheese: {
      title: "Cheese",
      threeCheeseBlend: {
        name: "Supreme Italian Three Cheese Blend",
        cost: "Cost per box: $57.08",
        units: "4 units per case",
      },
      mozzarella: {
        name: "Supreme Italian Mozzarella",
        cost: "Cost per box: $47.35",
        units: "4 units per case",
      },
    },
    sauces: {
      title: "Sauces",
      bonta: {
        name: "Bonta Pizza Sauce",
        cost: "Cost per box: $47.92",
        units: "6 units per case",
      },
      donPepino: {
        name: "Don Pepino Pizza Sauce",
        cost: "Cost per box: $33.61",
        units: "6 units per case",
      },
    },
    toppings: {
      title: "Toppings",
      pepperoni: {
        name: "Hormel Sliced Pepperoni",
        cost: "Cost per box: $146.76",
        units: "12 units per case",
      },
      combos: {
        name: "Combos Pizza Pretzel",
        cost: "Cost per box: $150.12",
        units: "12 units per case",
      },
    },
  },
  es: {
    title: "Ingredientes Base",
    crusts: {
      title: "Masas Philly",
      masa10: {
        name: 'Masa Philly 10"',
        unitCost: "Costo por unidad: $1.52",
        boxCost: "Costo por caja: $36.52",
        units: "24 unidades por caja",
      },
      masa12: {
        name: 'Masa Philly 12"',
        unitCost: "Costo por unidad: $1.77",
        boxCost: "Costo por caja: $42.40",
        units: "24 unidades por caja",
      },
      masa16: {
        name: 'Masa Philly 16"',
        unitCost: "Costo por unidad: $2.51",
        boxCost: "Costo por caja: $60.24",
        units: "24 unidades por caja",
      },
    },
    cheese: {
      title: "Quesos",
      threeCheeseBlend: {
        name: "Mezcla Tres Quesos Supremo Italiano",
        cost: "Costo por caja: $57.08",
        units: "4 unidades por caja",
      },
      mozzarella: {
        name: "Mozzarella Supremo Italiano",
        cost: "Costo por caja: $47.35",
        units: "4 unidades por caja",
      },
    },
    sauces: {
      title: "Salsas",
      bonta: {
        name: "Salsa Bonta",
        cost: "Costo por caja: $47.92",
        units: "6 unidades por caja",
      },
      donPepino: {
        name: "Salsa Don Pepino",
        cost: "Costo por caja: $33.61",
        units: "6 unidades por caja",
      },
    },
    toppings: {
      title: "Ingredientes",
      pepperoni: {
        name: "Pepperoni Hormel Rebanado",
        cost: "Costo por caja: $146.76",
        units: "12 unidades por caja",
      },
      combos: {
        name: "Combos Pizza Pretzel",
        cost: "Costo por caja: $150.12",
        units: "12 unidades por caja",
      },
    },
  },
};

interface ProductImageProps {
  src: string;
  alt: string;
}

function ProductImage({ src, alt }: ProductImageProps): ReactElement {
  return (
    <div className="relative w-full h-48 mb-4">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export default function IngredientesPage(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language];

  const ingredients = [
    {
      name: 'Masa Philly 10"',
      image: "/frozen-philly-crust-10.jpg.png",
      alt: "Masa 10 pulgadas",
      specs: "24 unidades por caja",
      unitPrice: "$1.52",
      casePrice: "$36.52",
      itemNumber: "671177",
      upc: "4460502004",
      bin: "40005",
    },
    {
      name: 'Masa Philly 12"',
      image: "/frozen-philly-crust-12.jpg.png",
      alt: "Masa 12 pulgadas",
      specs: "24 unidades por caja",
      unitPrice: "$1.77",
      casePrice: "$42.40",
      itemNumber: "44611",
      upc: "4460502001",
      bin: "40005",
    },
    {
      name: 'Masa Philly 16"',
      image: "/frozen-philly-crust-16.jpg.png",
      alt: "Masa 16 pulgadas",
      specs: "24 unidades por caja",
      unitPrice: "$2.51",
      casePrice: "$60.24",
      itemNumber: "44612",
      upc: "4460502002",
      bin: "40005",
    },
    {
      name: "Pepperoni Hormel Rebanado",
      image: "/hormel-pepperoni.jpg.png",
      alt: "Pepperoni Rebanado",
      specs: "12.5 Lb por caja",
      unitPrice: "$5.87 por libra",
      casePrice: "$146.76",
      itemNumber: "80354",
      upc: "3760048571",
      bin: "60029",
    },
    {
      name: "Combos Pizza Pretzel",
      image: "/combos-pizza-pretzel.jpg.png",
      alt: "Combos Pizza Pretzel",
      specs: "18 unidades por caja",
      casePrice: "$150.12",
      extraInfo: "12 unidades por case",
      itemNumber: "12011",
      upc: "4141971575",
      bin: "20015",
    },
    {
      name: "Mezcla Tres Quesos Supremo Italiano",
      image: "/supremo-italiano-3cheese.jpg.png",
      alt: "Mezcla Tres Quesos",
      specs: "5 Lbs - Provolone, Mozzarella, Cheddar",
      casePrice: "$57.08",
      itemNumber: "1440401",
      upc: "76069501639",
      bin: "70021",
    },
    {
      name: "Mozzarella Entera",
      image: "/supremo-italiano-mozzarella.jpg.png",
      alt: "Mozzarella",
      specs: "5 Lbs - Whole Milk Mozzarella",
      casePrice: "$47.35",
      itemNumber: "93003",
      upc: "7606950450",
      bin: "70020",
    },
    {
      name: "Salsa Bonta con Albahaca",
      image: "/bonta-pizza-sauce.jpg.png",
      alt: "Salsa Bonta",
      specs: "#10 Cans - Premium Pizza Sauce",
      casePrice: "$47.92",
      itemNumber: "29874",
      upc: "7848530110",
      bin: "7010",
    },
    {
      name: "Salsa Don Pepino",
      image: "/don-pepino-sauce.jpg.png",
      alt: "Don Pepino",
      specs: "#10 Cans - Pizza Sauce",
      casePrice: "$33.61",
      itemNumber: "23901",
      upc: "3027101007",
      bin: "7010",
    },
  ];

  const menuItems = [
    {
      name: "Pizza de Queso",
      image: "/pizza-queso.jpg",
      alt: "Pizza Personal",
      description: "Base de salsa Don Pepino, mezcla tres quesos",
      price: "$7.99",
      specs: ['Masa 10" Philly', "3 oz salsa", "4 oz queso"],
    },
    {
      name: "Pizza de Pepperoni",
      image: "/pizza-pepperoni.jpg",
      alt: "Pizza Personal Pepperoni",
      description: "Base de salsa, queso y pepperoni",
      price: "$9.99",
      specs: ["16-18 rebanadas de pepperoni", "Distribución en círculo"],
    },
  ];

  const partyPackages = [
    {
      title: "Birthday Basics",
      image: "/package-basic.jpg",
      description: "Ideal para 10-12 niños",
      price: "$39.99",
      specs: [
        '2 pizzas de 16" de queso',
        "Corte especial para fiesta",
        "16 porciones totales",
      ],
    },
    {
      title: "Pizza Party Plus",
      image: "/package-plus.jpg",
      description: "Ideal para 15-18 niños",
      price: "$64.99",
      specs: [
        '3 pizzas de 16"',
        "2 de queso, 1 de pepperoni",
        "1 caja de Combos Snacks",
      ],
    },
    {
      title: "Supreme Celebration",
      image: "/package-supreme.jpg",
      description: "Ideal para 20-25 niños",
      price: "$89.99",
      specs: [
        '4 pizzas de 16"',
        "2 de queso, 2 de pepperoni",
        "2 cajas de Combos Snacks",
      ],
    },
  ];

  const preparationGuides = [
    {
      size: '10" Personal',
      specs: [
        "Tiempo: 8-10 minutos",
        "Temperatura: 450°F",
        "Salsa: 3 oz",
        "Queso: 4 oz",
        "Pepperoni: 16-18 piezas",
      ],
    },
    {
      size: '12" Mediana',
      specs: [
        "Tiempo: 10-12 minutos",
        "Temperatura: 450°F",
        "Salsa: 4 oz",
        "Queso: 6 oz",
        "Pepperoni: 24-26 piezas",
      ],
    },
    {
      size: '16" Familiar',
      specs: [
        "Tiempo: 12-15 minutos",
        "Temperatura: 450°F",
        "Salsa: 6 oz",
        "Queso: 8 oz",
        "Pepperoni: 32-34 piezas",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gray-50 p-6 mb-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2">
          Menú Visual y Catálogo de Suministros
        </h1>
        <p className="text-gray-600">Guía de referencia para personal</p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Ingredientes Base</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <ProductCard key={index} {...ingredient} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Menú de Pizzas</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Pizza Personal (10")</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Paquetes para Fiestas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partyPackages.map((package_, index) => (
              <MenuItem
                key={index}
                name={package_.title}
                image={package_.image}
                alt={package_.title}
                description={package_.description}
                price={package_.price}
                specs={package_.specs}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Guía de Preparación</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preparationGuides.map((size, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <h3 className="text-lg font-semibold mb-2">{size.size}</h3>
              <div className="text-sm text-gray-600">
                {size.specs.map((spec, i) => (
                  <div key={i}>{spec}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
