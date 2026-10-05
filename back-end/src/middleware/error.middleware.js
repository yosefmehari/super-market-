/**
 * Centralized Error Handling Middleware
 */

// 404 handler for undefined routes
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
}

// Global error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message || err);

  // Handle Prisma specific error codes
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "The requested resource was not found",
    });
  }

  if (err.code === "P2023" || err.code === "P2000") {
    return res.status(400).json({
      success: false,
      message: "Invalid identifier or malformed request parameter",
    });
  }

  // Handle database connection issues safely
  if (err.code === "P1001" || err.code === "P1002" || err.code === "P1017") {
    return res.status(503).json({
      success: false,
      message: "Database service temporarily unavailable. Please try again shortly.",
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500
    ? "Internal server error. Please try again later."
    : err.message || "An error occurred";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
