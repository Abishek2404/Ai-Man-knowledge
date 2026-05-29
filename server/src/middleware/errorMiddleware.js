export function errorMiddleware(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || "Unexpected server error";
  res.status(status).json({ error: { message } });
}
