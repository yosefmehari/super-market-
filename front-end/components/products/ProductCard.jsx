"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {!imageError && product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Stock Badge on Image */}
        <div className="absolute top-2 right-2">
          {isOutOfStock ? (
            <span className="rounded-full bg-rose-500/90 px-2 py-0.5 text-xs font-semibold text-white shadow-xs backdrop-blur-xs">
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-semibold text-white shadow-xs backdrop-blur-xs">
              Only {product.stock} left
            </span>
          ) : null}
        </div>
      </div>

      {/* Category & Status */}
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          {product.category}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500">
          Stock: {product.stock}
        </span>
      </div>

      {/* Product Title */}
      <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100 dark:group-hover:text-emerald-400">
        {product.name}
      </h3>

      {/* Description Snippet */}
      <p className="mt-1 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
        {product.description}
      </p>

      {/* Price & Action */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          ${product.price.toFixed(2)}
        </span>
        <span className="inline-flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform dark:text-emerald-400">
          View details →
        </span>
      </div>
    </Link>
  );
}
