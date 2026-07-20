export function errorHandler(error, req, res, next) {
    if (
    error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      error: "Invalid JSON format",
    });
  }

  const statusCode = error.status || 500;

  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal server error" : error.message,
  });
}