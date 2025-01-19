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

const ingredients = {
  en: [
    {
      name: 'Philly Crust 10"',
      image: "/frozen-philly-crust-10.jpg.png",
      alt: "10-inch Crust",
      specs: "24 units per box",
      unitPrice: "$1.52",
      casePrice: "$36.52",
      itemNumber: "671177",
      upc: "4460502004",
      bin: "40005",
    },
    {
      name: 'Philly Crust 12"',
      image: "/frozen-philly-crust-12.jpg.png",
      alt: "12-inch Crust",
      specs: "24 units per box",
      unitPrice: "$1.77",
      casePrice: "$42.40",
      itemNumber: "44611",
      upc: "4460502001",
      bin: "40005",
    },
    {
      name: 'Philly Crust 16"',
      image: "/frozen-philly-crust-16.jpg.png",
      alt: "16-inch Crust",
      specs: "24 units per box",
      unitPrice: "$2.51",
      casePrice: "$60.24",
      itemNumber: "44612",
      upc: "4460502002",
      bin: "40005",
    },
    {
      name: "Hormel Sliced Pepperoni",
      image: "/hormel-pepperoni.jpg.png",
      alt: "Sliced Pepperoni",
      specs: "12.5 Lb per box",
      unitPrice: "$5.87 per pound",
      casePrice: "$146.76",
      itemNumber: "80354",
      upc: "3760048571",
      bin: "60029",
    },
    {
      name: "Combos Pizza Pretzel",
      image: "/combos-pizza-pretzel.jpg.png",
      alt: "Combos Pizza Pretzel",
      specs: "18 units per box",
      casePrice: "$150.12",
      extraInfo: "12 units per case",
      itemNumber: "12011",
      upc: "4141971575",
      bin: "20015",
    },
    {
      name: "Supreme Italian Three Cheese Blend",
      image: "/supremo-italiano-3cheese.jpg.png",
      alt: "Three Cheese Blend",
      specs: "5 Lbs - Provolone, Mozzarella, Cheddar",
      casePrice: "$57.08",
      itemNumber: "1440401",
      upc: "76069501639",
      bin: "70021",
    },
    {
      name: "Whole Milk Mozzarella",
      image: "/supremo-italiano-mozzarella.jpg.png",
      alt: "Mozzarella",
      specs: "5 Lbs - Whole Milk Mozzarella",
      casePrice: "$47.35",
      itemNumber: "93003",
      upc: "7606950450",
      bin: "70020",
    },
    {
      name: "Bonta Pizza Sauce with Basil",
      image: "/bonta-pizza-sauce.jpg.png",
      alt: "Bonta Sauce",
      specs: "#10 Cans - Premium Pizza Sauce",
      casePrice: "$47.92",
      itemNumber: "29874",
      upc: "7848530110",
      bin: "7010",
    },
    {
      name: "Don Pepino Pizza Sauce",
      image: "/don-pepino-sauce.jpg.png",
      alt: "Don Pepino",
      specs: "#10 Cans - Premium Pizza Sauce",
      casePrice: "$33.61",
      itemNumber: "29875",
      upc: "7848530111",
      bin: "7011",
    },
  ],
  es: [
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
      extraInfo: "12 unidades por caja",
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
      specs: "5 Lbs - Mozzarella Entera",
      casePrice: "$47.35",
      itemNumber: "93003",
      upc: "7606950450",
      bin: "70020",
    },
    {
      name: "Salsa Bonta con Albahaca",
      image: "/bonta-pizza-sauce.jpg.png",
      alt: "Salsa Bonta",
      specs: "Latas #10 - Salsa Premium para Pizza",
      casePrice: "$47.92",
      itemNumber: "29874",
      upc: "7848530110",
      bin: "7010",
    },
    {
      name: "Salsa Don Pepino",
      image: "/don-pepino-sauce.jpg.png",
      alt: "Don Pepino",
      specs: "Latas #10 - Salsa Premium para Pizza",
      casePrice: "$33.61",
      itemNumber: "29875",
      upc: "7848530111",
      bin: "7011",
    },
  ],
};

export default function IngredientsPage(): ReactElement {
  const { language } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {translations[language].title}
      </h1>

      {/* Crusts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {translations[language].crusts.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            image="/frozen-philly-crust-10.jpg.png"
            alt={translations[language].crusts.masa10.name}
            title={translations[language].crusts.masa10.name}
            details={[
              translations[language].crusts.masa10.unitCost,
              translations[language].crusts.masa10.boxCost,
              translations[language].crusts.masa10.units,
            ]}
            itemNumber="671177"
            upc="4460502004"
            bin="40005"
          />
          <ProductCard
            image="/frozen-philly-crust-12.jpg.png"
            alt={translations[language].crusts.masa12.name}
            title={translations[language].crusts.masa12.name}
            details={[
              translations[language].crusts.masa12.unitCost,
              translations[language].crusts.masa12.boxCost,
              translations[language].crusts.masa12.units,
            ]}
            itemNumber="44611"
            upc="4460502001"
            bin="40005"
          />
          <ProductCard
            image="/frozen-philly-crust-16.jpg.png"
            alt={translations[language].crusts.masa16.name}
            title={translations[language].crusts.masa16.name}
            details={[
              translations[language].crusts.masa16.unitCost,
              translations[language].crusts.masa16.boxCost,
              translations[language].crusts.masa16.units,
            ]}
            itemNumber="44612"
            upc="4460502002"
            bin="40005"
          />
        </div>
      </section>

      {/* Cheese Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {translations[language].cheese.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            image="/supremo-italiano-3cheese.jpg.png"
            alt={translations[language].cheese.threeCheeseBlend.name}
            title={translations[language].cheese.threeCheeseBlend.name}
            details={[
              translations[language].cheese.threeCheeseBlend.cost,
              translations[language].cheese.threeCheeseBlend.units,
            ]}
            itemNumber="1440401"
            upc="76069501639"
            bin="70021"
          />
          <ProductCard
            image="/supremo-italiano-mozzarella.jpg.png"
            alt={translations[language].cheese.mozzarella.name}
            title={translations[language].cheese.mozzarella.name}
            details={[
              translations[language].cheese.mozzarella.cost,
              translations[language].cheese.mozzarella.units,
            ]}
            itemNumber="93003"
            upc="7606950450"
            bin="70020"
          />
        </div>
      </section>

      {/* Sauces Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {translations[language].sauces.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            image="/bonta-pizza-sauce.jpg.png"
            alt={translations[language].sauces.bonta.name}
            title={translations[language].sauces.bonta.name}
            details={[
              translations[language].sauces.bonta.cost,
              translations[language].sauces.bonta.units,
            ]}
            itemNumber="29874"
            upc="7848530110"
            bin="7010"
          />
          <ProductCard
            image="/don-pepino-sauce.jpg.png"
            alt={translations[language].sauces.donPepino.name}
            title={translations[language].sauces.donPepino.name}
            details={[
              translations[language].sauces.donPepino.cost,
              translations[language].sauces.donPepino.units,
            ]}
            itemNumber="29875"
            upc="7848530111"
            bin="7011"
          />
        </div>
      </section>

      {/* Toppings Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          {translations[language].toppings.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            image="/hormel-pepperoni.jpg.png"
            alt={translations[language].toppings.pepperoni.name}
            title={translations[language].toppings.pepperoni.name}
            details={[
              translations[language].toppings.pepperoni.cost,
              translations[language].toppings.pepperoni.units,
            ]}
            itemNumber="80354"
            upc="3760048571"
            bin="60029"
          />
          <ProductCard
            image="/combos-pizza-pretzel.jpg.png"
            alt={translations[language].toppings.combos.name}
            title={translations[language].toppings.combos.name}
            details={[
              translations[language].toppings.combos.cost,
              translations[language].toppings.combos.units,
            ]}
            itemNumber="12011"
            upc="4141971575"
            bin="20015"
          />
        </div>
      </section>
    </main>
  );
}
