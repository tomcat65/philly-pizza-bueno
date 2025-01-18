"use client";

import { type ReactElement } from "react";

export function IngredientesSection(): ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Quesos</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              Mezcla Tres Quesos Supremo Italiano (5 lbs)
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Costo por bolsa: $14.27</li>
              <li>Costo por caja (4 unidades): $57.08</li>
              <li>Contiene: Provolone, Mozzarella, Cheddar</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              Mozzarella Entera Supremo Italiano (5 lbs)
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Costo por bolsa: $11.84</li>
              <li>Costo por caja (4 unidades): $47.35</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Salsas</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              Salsa Bonta con Albahaca (#10)
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Costo por lata: $7.99</li>
              <li>Costo por caja (6 unidades): $47.92</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              Salsa Don Pepino (#10)
            </h4>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Costo por lata: $5.60</li>
              <li>Costo por caja (6 unidades): $33.61</li>
              <li className="text-green-600 font-medium">
                * Recomendada por mejor margen
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Masas Philly
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
                {masa.size} ({masa.units} unidades)
              </h4>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>Costo por unidad: {masa.unitCost}</li>
                <li>Costo por caja: {masa.boxCost}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Pepperoni</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-medium text-gray-900">
            Hormel en rebanadas (12.5 lb)
          </h4>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>Costo por libra: $5.87</li>
            <li>Costo por caja: $146.76</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RecetasSection(): ReactElement {
  const pizzas = [
    {
      name: 'Pizza Personal (10")',
      cost: "$2.50",
      ingredients: [
        'Masa: 1 unidad de 10"',
        "Salsa: 3 oz Don Pepino",
        "Queso: 4 oz mezcla tres quesos",
        "Pepperoni (opcional): 1 oz (16-18 rebanadas)",
      ],
      price: "$7.99",
      margin: "69%",
    },
    {
      name: 'Pizza Mediana (12")',
      cost: "$3.00",
      ingredients: [
        'Masa: 1 unidad de 12"',
        "Salsa: 4 oz Don Pepino",
        "Queso: 6 oz mezcla tres quesos",
        "Pepperoni (opcional): 1.5 oz (24-26 rebanadas)",
      ],
      price: "$12.99",
      margin: "77%",
    },
    {
      name: 'Pizza Familiar (16")',
      cost: "$4.50",
      ingredients: [
        'Masa: 1 unidad de 16"',
        "Salsa: 6 oz Don Pepino",
        "Queso: 8 oz mezcla tres quesos",
        "Pepperoni (opcional): 2 oz (32-34 rebanadas)",
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
              <p className="text-gray-600">Costo Base: {pizza.cost}</p>
              <p className="text-green-600 font-medium">
                Precio: {pizza.price}
              </p>
              <p className="text-blue-600">Margen: {pizza.margin}</p>
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
  const packages = [
    {
      name: "BÁSICO - BIRTHDAY BASICS",
      capacity: "10-12 niños",
      items: [
        '2 pizzas de 16" de queso',
        "Corte especial para fiesta (8 rebanadas c/u)",
      ],
      cost: "$13.50",
      price: "$39.99",
      margin: "66%",
    },
    {
      name: "PLUS - PIZZA PARTY PLUS",
      capacity: "15-18 niños",
      items: [
        '3 pizzas de 16" (2 queso, 1 pepperoni)',
        "Corte especial para fiesta",
        "1 caja de Combos Snacks",
      ],
      cost: "$22.50",
      price: "$64.99",
      margin: "65%",
    },
    {
      name: "SUPREME - SUPREME CELEBRATION",
      capacity: "20-25 niños",
      items: [
        '4 pizzas de 16" (2 queso, 2 pepperoni)',
        "2 cajas de Combos Snacks",
        "Corte personalizado disponible",
      ],
      cost: "$31.50",
      price: "$89.99",
      margin: "65%",
    },
  ];

  return (
    <div className="space-y-6">
      {packages.map((pack) => (
        <div key={pack.name} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {pack.name}
              </h3>
              <p className="text-blue-600">Capacidad: {pack.capacity}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Costo: {pack.cost}</p>
              <p className="text-green-600 font-medium">Precio: {pack.price}</p>
              <p className="text-blue-600">Margen: {pack.margin}</p>
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
  const extras = [
    {
      name: "Queso Extra",
      price: "$2.99",
      cost: "$0.50",
    },
    {
      name: "Pepperoni Extra",
      price: "$3.99",
      cost: "$0.73",
    },
    {
      name: 'Mejora de 12" a 16"',
      price: "$5.99",
      cost: "$1.50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Promociones Diarias
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">
              "EARLY BIRD": Antes de 2 PM
            </h4>
            <p className="mt-2 text-gray-600">
              Caja de Combos gratis con cualquier paquete
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900">"MIÉRCOLES DE FIESTA"</h4>
            <p className="mt-2 text-gray-600">20% descuento en paquetes</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Extras y Mejoras
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {extras.map((extra) => (
            <div key={extra.name} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900">{extra.name}</h4>
              <div className="mt-2 space-y-1 text-gray-600">
                <p>Precio: {extra.price}</p>
                <p>Costo: {extra.cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProcedimientosSection(): ReactElement {
  const stations = [
    {
      name: "Estación de Salsa",
      items: [
        "Porciones pre-medidas: 3oz, 4oz, 6oz",
        "Cucharones marcados por tamaño",
        "Mantener a 41°F o menos",
      ],
    },
    {
      name: "Estación de Queso",
      items: [
        "Contenedores pre-porcionados y etiquetados",
        "4oz, 6oz, 8oz",
        "Mantener a 41°F o menos",
      ],
    },
    {
      name: "Estación de Pepperoni",
      items: [
        "Porciones pre-contadas",
        "18, 26, 34 piezas por pizza",
        "Mantener a 41°F o menos",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Preparación de Estación
        </h3>
        <div className="space-y-4">
          {stations.map((station) => (
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
          Proceso de Horneado
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">Temperatura: 450°F</p>
          <div className="mt-2">
            <p className="font-medium text-gray-900">Tiempos:</p>
            <ul className="mt-1 space-y-1 text-gray-600">
              <li>10": 8-10 minutos</li>
              <li>12": 10-12 minutos</li>
              <li>16": 12-15 minutos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalidadSection(): ReactElement {
  const sections = [
    {
      name: "Temperaturas",
      items: [
        "Revisar temperaturas cada 2 horas",
        "Registrar temperatura del horno al inicio",
        "Calibrar termómetros semanalmente",
      ],
    },
    {
      name: "Control de Porciones",
      items: [
        "Usar básculas primera semana",
        "Tablas de porciones visibles",
        "Revisiones aleatorias",
      ],
    },
    {
      name: "Almacenamiento",
      items: [
        "Queso: máximo 3 días una vez abierto",
        "Salsa: máximo 2 días una vez abierta",
        "Ingredientes preparados: máximo 24 horas",
      ],
    },
    {
      name: "Pedidos Anticipados",
      items: [
        "24 horas de anticipación preferentemente",
        "Precio especial por pago anticipado",
        "Lista de verificación por paquete",
      ],
    },
    {
      name: "Pedidos Urgentes",
      items: [
        "Mínimo 2 horas de anticipación",
        "Cargo por urgencia: $10 (menos de 2 horas)",
        "Mantener 2 kits de emergencia listos",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
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
