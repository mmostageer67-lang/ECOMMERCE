const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;
  const status = err.status || 'error';
  
  const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production';

  res.status(statusCode).json({
    status: status,
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
};
module.exports = errorMiddleware;