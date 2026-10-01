import { apiFetch } from "./api";

/**
 * Fetch a paginated list of products with optional search and category filters
 * @param {Object} [params={}]
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 * @param {string} [params.search=""]
 * @param {string} [params.category=""]
 * @returns {Promise<{ success: boolean, data: Array, pagination: Object }>}
 */
export async function getProducts({ page = 1, limit = 10, search = "", category = "" } = {}) {
  const query = new URLSearchParams();

  if (page) query.set("page", String(page));
  if (limit) query.set("limit", String(limit));
  if (search && search.trim()) query.set("search", search.trim());
  if (category && category.trim() && category.toLowerCase() !== "all") {
    query.set("category", category.trim());
  }

  const queryString = query.toString();
  const endpoint = `/api/products${queryString ? `?${queryString}` : ""}`;

  return apiFetch(endpoint);
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<{ success: boolean, data: Object }>}
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  return apiFetch(`/api/products/${encodeURIComponent(id)}`);
}
