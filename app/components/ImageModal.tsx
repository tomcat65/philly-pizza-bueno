"use client";

import { useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  details?: {
    itemNumber?: string;
    upc?: string;
    bin?: string;
  };
}

export function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  details,
}: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          ×
        </button>
        <div className="relative h-[60vh] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            quality={100}
          />
        </div>
        {details && (
          <div className="mt-4 text-center">
            {details.itemNumber && (
              <p className="text-gray-700">
                <span className="font-semibold">Item:</span>{" "}
                {details.itemNumber}
              </p>
            )}
            {details.upc && (
              <p className="text-gray-700">
                <span className="font-semibold">UPC:</span> {details.upc}
              </p>
            )}
            {details.bin && (
              <p className="text-gray-700">
                <span className="font-semibold">BIN:</span> {details.bin}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
