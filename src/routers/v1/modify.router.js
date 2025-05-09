import express from 'express';
import * as modifyController from '../../controllers/modify.controller.js';
import * as modifyMiddleware from '../../middlewares/modify.middleware.js';

const toolsRouter = express.Router();

// modify Routes
toolsRouter.post('/merge-pdf', modifyMiddleware.uploadMultiplePdfs(), modifyController.mergePdfHandler);
toolsRouter.post('/split-pdf', modifyMiddleware.uploadSinglePdf(), modifyController.splitPdfHandler);
toolsRouter.post('/compress-pdf', modifyMiddleware.uploadSinglePdf(), modifyController.compressPdfHandler);
toolsRouter.post('/ocr-pdf', modifyMiddleware.uploadSinglePdf(), modifyController.ocrPdfHandler);
toolsRouter.post('/rotate-pdf', modifyMiddleware.uploadSinglePdf(), modifyController.rotatePdfHandler);

export default toolsRouter;
