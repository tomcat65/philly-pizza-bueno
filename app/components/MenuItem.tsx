"use client";

import { ProductImage } from "./ProductImage";

interface MenuItemProps {
  name: string;
  image: string;
  alt: string;
  description: string;
  price: string;
  specs: string[];
}

export function MenuItem({
  name,
  image,
  alt,
  description,
  price,
  specs,
}: MenuItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <ProductImage src={image} alt={alt} />
      <h4 className="text-lg font-semibold">{name}</h4>
      <p className="text-gray-600">{description}</p>
      <p className="text-lg font-bold text-green-700">Precio: {price}</p>
      <div className="text-sm text-gray-600 mt-2">
        {specs.map((spec, i) => (
          <div key={i}>- {spec}</div>
        ))}
      </div>
    </div>
  );
}
