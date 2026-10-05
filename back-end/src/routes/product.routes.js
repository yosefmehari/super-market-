const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

// GET /api/products - list products with pagination, search, category
router.get("/", (req, res, next) => productController.getProducts(req, res, next));

// GET /api/products/:id - get single product by ID
router.get("/:id", (req, res, next) => productController.getProductById(req, res, next));

module.exports = router;
