import { NotFoundError } from "../utils/errors/app.error.js";

export const notFoundHandler = (req, res, next) => {
    return next(new NotFoundError(`API not found: ${req.originalUrl}`));
};

export const appErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.statusCode,
        success: false,
        message: err.message,
        name: err.name
    });
}
