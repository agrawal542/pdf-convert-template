import multer from 'multer';
import { BadRequestError } from '../utils/errors/app.error.js';

// Use memory storage to store the file in memory (buffer)
const storage = multer.memoryStorage();

// Generic file filter
const dynamicFileFilter = (allowedTypes) => (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // If file type is not allowed, throw a BadRequestError
        cb(new BadRequestError(`File type ${file.mimetype} is not allowed.`), false);
    }
};

// Middleware factory for single file upload
export const uploadSingleFile = (allowedTypes = [], fieldName = 'file') => {
    return (req, res, next) => {
        // Call multer with memory storage and dynamic file filter
        multer({
            storage,
            fileFilter: dynamicFileFilter(allowedTypes),
            limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
        }).single(fieldName)(req, res, (err) => {
            if (err) {
                // Handle multer specific errors
                if (err instanceof multer.MulterError) {
                    // Handle Multer errors, e.g., file too large
                    return next(new BadRequestError(err.message));
                } else {
                    // Handle custom errors (file type not allowed, etc.)
                    return next(err);
                }
            }
            next(); // Proceed to the next middleware if upload is successful
        });
    };
};
