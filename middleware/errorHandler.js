const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: Object.values(err.errors).map(val => val.message)
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Duplicate value entered'
        });
    }

    // JWT error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }

    // Default error
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
};

export default errorHandler; 