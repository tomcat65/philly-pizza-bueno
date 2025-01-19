"use client";

import { type ReactElement } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations/manual";

interface Package {
  name: string;
  capacity: string;
  items: string[];
  cost: string;
  price: string;
  margin: string;
}

export function IngredientesSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].ingredients;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.cheese.title}
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              {t.cheese.threeCheeseBlend.name}
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>{t.cheese.threeCheeseBlend.costPerBag}</li>
              <li>{t.cheese.threeCheeseBlend.costPerBox}</li>
              <li>{t.cheese.threeCheeseBlend.contains}</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              {t.cheese.mozzarella.name}
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>{t.cheese.mozzarella.costPerBag}</li>
              <li>{t.cheese.mozzarella.costPerBox}</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.sauces.title}
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">{t.sauces.bonta.name}</h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>{t.sauces.bonta.costPerCan}</li>
              <li>{t.sauces.bonta.costPerBox}</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              {t.sauces.donPepino.name}
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>{t.sauces.donPepino.costPerCan}</li>
              <li>{t.sauces.donPepino.costPerBox}</li>
              <li className="text-green-600 font-medium">
                {t.sauces.donPepino.recommended}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.crusts.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              size: '10"',
              units: 24,
              unitCost: "$1.52",
              boxCost: "$36.52",
            },
            {
              size: '12"',
              units: 24,
              unitCost: "$1.77",
              boxCost: "$42.40",
            },
            {
              size: '16"',
              units: 24,
              unitCost: "$2.51",
              boxCost: "$60.24",
            },
          ].map((masa) => (
            <div key={masa.size} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900">
                {masa.size} ({masa.units} {t.crusts.units})
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>
                  {t.crusts.costPerUnit}: {masa.unitCost}
                </li>
                <li>
                  {t.crusts.costPerBox}: {masa.boxCost}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.pepperoni.title}
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-900">
            {t.pepperoni.hormel.name}
          </h4>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>{t.pepperoni.hormel.costPerPound}</li>
            <li>{t.pepperoni.hormel.costPerBox}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RecetasSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].recipes;

  const pizzas = [
    {
      name: language === "en" ? 'Personal Pizza (10")' : 'Pizza Personal (10")',
      cost: "$2.50",
      ingredients: [
        `${t.crust}: 1 ${language === "en" ? "unit" : "unidad"} 10"`,
        `${t.sauce}: 3 oz Don Pepino`,
        `${t.cheese}: 4 oz ${
          language === "en" ? "three cheese blend" : "mezcla tres quesos"
        }`,
        `${t.pepperoni}: 1 oz (16-18 ${t.slices})`,
      ],
      price: "$7.99",
      margin: "69%",
    },
    {
      name: language === "en" ? 'Medium Pizza (12")' : 'Pizza Mediana (12")',
      cost: "$3.00",
      ingredients: [
        `${t.crust}: 1 ${language === "en" ? "unit" : "unidad"} 12"`,
        `${t.sauce}: 4 oz Don Pepino`,
        `${t.cheese}: 6 oz ${
          language === "en" ? "three cheese blend" : "mezcla tres quesos"
        }`,
        `${t.pepperoni}: 1.5 oz (24-26 ${t.slices})`,
      ],
      price: "$12.99",
      margin: "77%",
    },
    {
      name: language === "en" ? 'Family Pizza (16")' : 'Pizza Familiar (16")',
      cost: "$4.50",
      ingredients: [
        `${t.crust}: 1 ${language === "en" ? "unit" : "unidad"} 16"`,
        `${t.sauce}: 6 oz Don Pepino`,
        `${t.cheese}: 8 oz ${
          language === "en" ? "three cheese blend" : "mezcla tres quesos"
        }`,
        `${t.pepperoni}: 2 oz (32-34 ${t.slices})`,
      ],
      price: "$19.99",
      margin: "77%",
    },
  ];

  return (
    <div className="space-y-6">
      {pizzas.map((pizza) => (
        <div key={pizza.name} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              {pizza.name}
            </h3>
            <div className="text-right">
              <p className="text-gray-600">
                {t.costBase}: {pizza.cost}
              </p>
              <p className="text-green-600 font-medium">
                {t.price}: {pizza.price}
              </p>
              <p className="text-blue-600">
                {t.margin}: {pizza.margin}
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-1 text-gray-600">
            {pizza.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PaquetesSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].packages;

  return (
    <div className="space-y-6">
      {[t.basic, t.plus, t.supreme].map((pack) => (
        <div key={pack.name} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {pack.name}
              </h3>
              <p className="text-blue-600">
                {t.capacity}: {pack.capacity}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                {t.cost}: {pack.cost}
              </p>
              <p className="text-green-600 font-medium">
                {t.price}: {pack.price}
              </p>
              <p className="text-blue-600">
                {t.margin}: {pack.margin}
              </p>
            </div>
          </div>
          <ul className="mt-3 space-y-1 text-gray-600">
            {pack.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function PromocionesSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].promotions;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.dailyPromotions.title}
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              {t.dailyPromotions.earlyBird.name}
            </h4>
            <p className="mt-2 text-gray-600">
              {t.dailyPromotions.earlyBird.description}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              {t.dailyPromotions.wednesdayParty.name}
            </h4>
            <p className="mt-2 text-gray-600">
              {t.dailyPromotions.wednesdayParty.description}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.extrasAndUpgrades.title}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            t.extrasAndUpgrades.extraCheese,
            t.extrasAndUpgrades.extraPepperoni,
            t.extrasAndUpgrades.sizeUpgrade,
          ].map((extra) => (
            <div key={extra.name} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900">{extra.name}</h4>
              <div className="mt-2 space-y-1 text-gray-600">
                <p>
                  {extra.price}: {extra.price}
                </p>
                <p>
                  {extra.cost}: {extra.cost}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcedimientosSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].procedures;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.stationPrep.title}
        </h3>
        <div className="space-y-4">
          {[
            t.stationPrep.sauce,
            t.stationPrep.cheese,
            t.stationPrep.pepperoni,
          ].map((station) => (
            <div
              key={station.name}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <h4 className="font-medium text-gray-900">{station.name}</h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                {station.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {t.baking.title}
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">
            {t.baking.temperature}: 450°F
          </p>
          <div className="mt-2">
            <p className="font-medium text-gray-900">{t.baking.times}:</p>
            <ul className="mt-1 space-y-1 text-gray-600">
              <li>10": 8-10 {language === "en" ? "minutes" : "minutos"}</li>
              <li>12": 10-12 {language === "en" ? "minutes" : "minutos"}</li>
              <li>16": 12-15 {language === "en" ? "minutes" : "minutos"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalidadSection(): ReactElement {
  const { language } = useLanguage();
  const t = translations[language].quality;

  return (
    <div className="space-y-6">
      {[
        t.temperatures,
        t.portionControl,
        t.storage,
        t.advanceOrders,
        t.urgentOrders,
      ].map((section) => (
        <div key={section.name} className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-900">{section.name}</h4>
          <ul className="mt-2 space-y-1 text-gray-600">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
