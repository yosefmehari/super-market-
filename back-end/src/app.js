const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "E-commerce API is running",
  });
});

// Product API routes
app.use("/api/products", productRoutes);

// Catch 404 for unmatched routes
app.use(notFoundHandler);

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;