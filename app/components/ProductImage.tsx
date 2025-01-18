"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { ImageModal } from "./ImageModal";

interface ProductImageProps {
  src: string;
  alt: string;
  itemNumber?: string;
  upc?: string;
  bin?: string;
}

export function ProductImage({
  src,
  alt,
  itemNumber,
  upc,
  bin,
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagePath = src.startsWith("/") ? src : `/${src}`;

  return (
    <>
      <div
        className="relative h-48 mb-4 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Suspense
          fallback={
            <div className="h-48 bg-gray-100 animate-pulse rounded-md" />
          }
        >
          <div
            className={`relative h-48 transition-all duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative h-full overflow-hidden rounded-md">
              <Image
                src={imagePath}
                alt={alt}
                fill
                className={`object-contain rounded-md transition-transform duration-300 ${
                  isHovered ? "scale-125" : "scale-100"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
                quality={85}
                onLoadingComplete={() => setIsLoading(false)}
              />
              {/* Details Overlay */}
              <div
                className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-sm p-4 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                {itemNumber && (
                  <p className="mb-1">
                    <span className="font-semibold">Item:</span> {itemNumber}
                  </p>
                )}
                {upc && (
                  <p className="mb-1">
                    <span className="font-semibold">UPC:</span> {upc}
                  </p>
                )}
                {bin && (
                  <p className="mb-1">
                    <span className="font-semibold">BIN:</span> {bin}
                  </p>
                )}
                <p className="text-xs mt-2 text-blue-300">Click para ampliar</p>
              </div>
            </div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-md" />
          )}
        </Suspense>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={imagePath}
        alt={alt}
        details={{ itemNumber, upc, bin }}
      />
    </>
  );
}
