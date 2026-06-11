const errorMiddleware = (err, req, res, _next) => {
    const statusCode = err.statusCode || err.status || 500;
    const isServerError = statusCode >= 500;

    if (isServerError) {
        console.error(err);
    }

    return res.status(statusCode).json({
        message: isServerError
            ? 'Internal server error'
            : err.message || 'Something went wrong'
    });
};

module.exports = errorMiddleware;