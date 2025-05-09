import { ZodError } from "zod";
import { BadRequestError } from "../utils/errors/app.error.js";
import logger from "../config/logger.config.js";

/**
 * Middleware to validate the request body using a Zod schema.
 * 
 * @param {ZodSchema} schema - Zod schema to validate the request body
 * @returns {Function} - Express middleware function
 */
export const validateRequestBody = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            logger.info("Request body is valid");
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.errors.map(err => {
                    const field = err.path.join('.');
                    return `${field}: ${err.message}`;
                });

                logger.error("Request body is invalid", { errors: messages });
                return next(new BadRequestError(`Invalid request body: ${messages.join(', ')}`));
            }

            logger.error("Unexpected error during body validation", { error });
            return next(new BadRequestError("An unexpected error occurred during request body validation"));
        }
    };
};

/**
 * Middleware to validate the request query parameters using a Zod schema.
 * 
 * @param {ZodSchema} schema - Zod schema to validate the request query
 * @returns {Function} - Express middleware function
 */
export const validateQueryParams = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.query);
            logger.info("Query params are valid");
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.errors.map(err => {
                    const field = err.path.join('.');
                    return `${field}: ${err.message}`;
                });

                logger.error("Query params are invalid", { errors: messages });
                return next(new BadRequestError(`Invalid query parameters: ${messages.join(', ')}`));
            }

            logger.error("Unexpected error during query validation", { error });
            return next(new BadRequestError("An unexpected error occurred during query validation"));
        }
    };
};
