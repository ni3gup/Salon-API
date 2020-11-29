const error = (error, req, res, next) => {
    if (error.statusCode === 500) {
        console.log(error);
    }

    const statusCode = error.statusCode || 500;
    const status = error.status;
    const message = error.statusCode !== 500 ? error.message : "Oops! Something went wrong. Please try again later.";
    const data = error.data;

    res.status(statusCode).json({ status, message, data });

    next();
};

module.exports = error;