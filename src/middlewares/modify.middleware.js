import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { BadRequestError } from '../utils/errors/app.error.js';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
});

// Allow only PDF files
const pdfFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new BadRequestError('Only PDF files are allowed.'), false);
    }
};

// Middleware for single PDF upload
export const uploadSinglePdf = (fieldName = 'file') => {
    return (req, res, next) => {
        multer({
            storage,
            fileFilter: pdfFileFilter,
            limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
        }).single(fieldName)(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    return next(new BadRequestError(err.message));
                } else {
                    return next(err);
                }
            }
            next();
        });
    };
};

// Middleware for multiple PDF uploads
export const uploadMultiplePdfs = (fieldName = 'files') => {
    return (req, res, next) => {
        multer({
            storage,
            fileFilter: pdfFileFilter,
            limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit per file
        }).array(fieldName)(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    return next(new BadRequestError(err.message));
                } else {
                    return next(err);
                }
            }
            next();
        });
    };
};
