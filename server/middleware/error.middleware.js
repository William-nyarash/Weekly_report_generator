const errorHandler = (error, request, response, next ) => {
    console.error(error)

    const statusCode = error.statusCode || 5000;

    response.status(statusCode).json({
        status: statusCode >= 500 ? "erro": "fail",
        message: error.message,
        stack: process.env.NODE_ENV == "development"
        ? error.stack
        : undefined
    })
};
module.exports = errorHandler