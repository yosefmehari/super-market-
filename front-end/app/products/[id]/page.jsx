"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!productId) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getProductById(productId)
      .then((res) => {
        if (!isMounted) return;
        if (res && res.success && res.data) {
          setProduct(res.data);
        } else {
          setError("Product not found");
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching product detail:", err);
        setError(err.message || "Failed to load product details");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-6 w-32 rounded-md bg-zinc-200 animate-pulse dark:bg-zinc-800 mb-8" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="aspect-square w-full rounded-2xl bg-zinc-200 animate-pulse dark:bg-zinc-800" />
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-4 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-24 w-full rounded-md bg-zinc-200 dark:bg-zinc-800 mt-4" />
              <div className="h-12 w-48 rounded-xl bg-zinc-200 dark:bg-zinc-800 mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Product Not Found
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {error || "The product you are looking for does not exist or may have been removed."}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Go Back
            </button>
            <Link
              href="/products"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
          >
            ← Back to Products
          </Link>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs lg:grid-cols-2 lg:p-10 dark:border-zinc-800 dark:bg-zinc-900">
          {/* Left Column: Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
            {!imageError && product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-400">
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Right Column: Product Information */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Badge & Stock Status */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {product.category}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      isOutOfStock ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {isOutOfStock ? "Out of Stock" : `${product.stock} units available`}
                  </span>
                </div>
              </div>

              {/* Product Name */}
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {product.name}
              </h1>

              {/* Product Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400">USD</span>
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Product Description
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {product.description}
                </p>
              </div>

              {/* Stock Details */}
              <div className="mt-6 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Inventory Status</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {isOutOfStock ? "Sold Out" : "In Stock"}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Stock Quantity</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100">{product.stock}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons (Add to Cart disabled/placeholder for Phase 3) */}
            <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled
                  className="flex-1 cursor-not-allowed rounded-xl bg-zinc-300 py-3.5 px-6 text-center text-sm font-semibold text-zinc-600 opacity-80 dark:bg-zinc-800 dark:text-zinc-400"
                  title="Cart feature will be available in Phase 3"
                >
                  Add to Cart (Coming in Phase 3)
                </button>
                <Link
                  href="/products"
                  className="rounded-xl border border-zinc-300 bg-white py-3.5 px-6 text-center text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Continue Browsing
                </Link>
              </div>
              <p className="mt-2 text-center text-xs text-zinc-400">
                Phase 2 Product Viewer • Cart functionality is scheduled for Phase 3
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
