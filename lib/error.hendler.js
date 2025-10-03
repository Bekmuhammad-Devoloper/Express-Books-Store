function errorHandler(err, req, res, next) {
    console.error("Error:", err.message)

    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error"
    })
}

export { errorHandler }
