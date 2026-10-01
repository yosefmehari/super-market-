"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts } from "@/lib/products";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (page = 1, searchQuery = "", categoryFilter = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getProducts({
        page,
        limit: 8,
        search: searchQuery,
        category: categoryFilter,
      });

      if (response && response.success) {
        setProducts(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        throw new Error(response?.message || "Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err.message || "Failed to connect to the backend server. Please verify the Express API is running."
      );
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch whenever search, category, or page changes
  useEffect(() => {
    fetchProducts(pagination.page, search, category);
  }, [fetchProducts, pagination.page, search, category]);

  const handleSearch = useCallback((term) => {
    setSearch(term);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handleSelectCategory = useCallback((cat) => {
    setCategory(cat);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Explore Our Products
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Browse our full catalog retrieved in real-time from our Express REST API & PostgreSQL database.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ProductSearch
              initialValue={search}
              onSearch={handleSearch}
            />

            {/* Results count info */}
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {!isLoading && (
                <span>
                  Showing <strong className="text-zinc-900 dark:text-zinc-100">{products.length}</strong> of{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100">{pagination.total}</strong> products
                </span>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <ProductFilters
              selectedCategory={category}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
          onRetry={() => fetchProducts(pagination.page, search, category)}
        />

        {/* Pagination Controls */}
        {!isLoading && !error && pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              ← Previous
            </button>

            <span className="px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              type="button"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
