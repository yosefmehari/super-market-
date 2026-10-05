const prisma = require("../config/database");

/**
 * Service for handling product database operations
 */
class ProductService {
  /**
   * Fetch products with pagination, search, and category filter
   * @param {Object} options
   * @param {number} [options.page=1]
   * @param {number} [options.limit=10]
   * @param {string} [options.search]
   * @param {string} [options.category]
   * @returns {Promise<{ products: Array, pagination: Object }>}
   */
  async getProducts({ page = 1, limit = 10, search, category } = {}) {
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const where = {};

    // Filter by category (ignoring "all" or empty string)
    if (category && typeof category === "string" && category.trim() && category.toLowerCase() !== "all") {
      where.category = {
        equals: category.trim(),
        mode: "insensitive",
      };
    }

    // Search against product name and description
    if (search && typeof search === "string" && search.trim()) {
      const searchTerm = search.trim();
      where.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    // Execute query and total count in parallel transaction
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: parsedLimit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / parsedLimit) || 1;

    return {
      products,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Fetch a single product by its ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getProductById(id) {
    if (!id || typeof id !== "string" || !id.trim()) {
      return null;
    }

    const product = await prisma.product.findUnique({
      where: {
        id: id.trim(),
      },
    });

    return product;
  }
}

module.exports = new ProductService();
