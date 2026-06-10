const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500
  return res.status(statusCode).json({message: err.message});

}

module.exports = errorMiddleware;