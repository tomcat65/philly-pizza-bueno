"use client";

import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  name: string;
  image: string;
  alt: string;
  specs: string;
  unitPrice?: string;
  casePrice: string;
  extraInfo?: string;
  itemNumber?: string;
  upc?: string;
  bin?: string;
}

export function ProductCard({
  name,
  image,
  alt,
  specs,
  unitPrice,
  casePrice,
  extraInfo,
  itemNumber,
  upc,
  bin,
}: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <ProductImage
        src={image}
        alt={alt}
        itemNumber={itemNumber}
        upc={upc}
        bin={bin}
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{specs}</p>
      {unitPrice && (
        <p className="text-lg font-bold text-green-700">
          Costo por unidad: {unitPrice}
        </p>
      )}
      <p
        className={`${
          unitPrice ? "text-gray-600" : "text-lg font-bold text-green-700"
        }`}
      >
        Costo por {unitPrice ? "caja" : "case"}: {casePrice}
      </p>
      {extraInfo && <p className="text-gray-600">{extraInfo}</p>}
    </div>
  );
}
