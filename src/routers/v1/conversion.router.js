import express from 'express';
import * as conversionController from '../../controllers/conversion.controller.js';
import * as conversionMiddleware from '../../middlewares/conversion.middleware.js';

const conversionRouter = express.Router();

// Conversion Routes
conversionRouter.post('/pdf-to-word', conversionMiddleware.uploadSingleFile(['application/pdf']), conversionController.pdfToWordHandler);
conversionRouter.post('/word-to-pdf', conversionController.wordToPdfHandler);

conversionRouter.post('/pdf-to-excel', conversionController.pdfToExcelHandler);
conversionRouter.post('/excel-to-pdf', conversionController.excelToPdfHandler);

conversionRouter.post('/pdf-to-ppt', conversionController.pdfToPptHandler);
conversionRouter.post('/ppt-to-pdf', conversionController.pptToPdfHandler);


conversionRouter.post('/jpg-to-pdf', conversionController.jpgToPdfHandler);
conversionRouter.post('/pdf-to-jpg', conversionController.pdfToJpgHandler);



export default conversionRouter;
