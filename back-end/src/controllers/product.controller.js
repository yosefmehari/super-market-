const productService = require("../services/product.service");

/**
 * Controller for product endpoints
 */
class ProductController {
  /**
   * GET /api/products
   * Fetch all products with pagination, search, and category filter
   */
  async getProducts(req, res, next) {
    try {
      const { page, limit, search, category } = req.query;

      // Validate pagination query parameters if provided
      let parsedPage = 1;
      let parsedLimit = 10;

      if (page !== undefined) {
        parsedPage = parseInt(page, 10);
        if (isNaN(parsedPage) || parsedPage < 1) {
          return res.status(400).json({
            success: false,
            message: "Query parameter 'page' must be a positive integer",
          });
        }
      }

      if (limit !== undefined) {
        parsedLimit = parseInt(limit, 10);
        if (isNaN(parsedLimit) || parsedLimit < 1) {
          return res.status(400).json({
            success: false,
            message: "Query parameter 'limit' must be a positive integer",
          });
        }
      }

      const result = await productService.getProducts({
        page: parsedPage,
        limit: parsedLimit,
        search,
        category,
      });

      return res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:id
   * Fetch a single product by ID
   */
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== "string" || !id.trim()) {
        return res.status(400).json({
          success: false,
          message: "A valid product ID is required",
        });
      }

      const product = await productService.getProductById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
