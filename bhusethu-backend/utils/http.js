export function sendError(res, err) {
  if (res.headersSent) return;
  const status = err.status || err.statusCode || 500;
  const message =
    status >= 500 && process.env.NODE_ENV === 'production'
      ? 'Something went wrong. Please try again.'
      : err.message;
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, error: message });
}
