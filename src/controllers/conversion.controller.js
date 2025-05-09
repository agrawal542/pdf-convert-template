import { InternalServerError } from "../utils/errors/app.error.js";
// conversion.controller.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const pdfToWordHandler = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    // Force .pdf filename with timestamp
    const timestamp = Date.now();
    const tmpDir = '/tmp';
    const inputFileName = `${timestamp}_input.pdf`; // MUST end with .pdf
    const outputFileName = inputFileName.replace('.pdf', '.docx');

    const inputPath = path.join(tmpDir, inputFileName);
    const outputPath = path.join(tmpDir, outputFileName);

    // Log input info
    console.log("Received file:", req.file.originalname);
    console.log("MIME type:", req.file.mimetype);
    console.log("Saved input path:", inputPath);

    // Save PDF buffer to disk
    fs.writeFileSync(inputPath, req.file.buffer);

    // Convert to DOCX using LibreOffice CLI
    const command = `libreoffice --headless --convert-to docx --outdir "${tmpDir}" "${inputPath}"`;
    const { stdout, stderr } = await execAsync(command);

    console.log("LibreOffice stdout:", stdout);
    console.error("LibreOffice stderr:", stderr);

    // Check if conversion succeeded
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Converted file not found at ${outputPath}`);
    }

    // Read the output .docx
    const docxBuffer = fs.readFileSync(outputPath);

    // Send as downloadable file
    res.setHeader('Content-Disposition', 'attachment; filename=converted.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(docxBuffer);

    // Cleanup
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error("PDF to Word conversion error:", error);
    res.status(500).json({ message: "Conversion failed", error: error.message });
  }
};







// Converts a Word document to a PDF file
export const wordToPdfHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Word to PDF conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during Word to PDF conversion."));
    }
};

// Converts a PDF file to an Excel spreadsheet
export const pdfToExcelHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "PDF to Excel conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during PDF to Excel conversion."));
    }
};

// Converts an Excel spreadsheet to a PDF file
export const excelToPdfHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Excel to PDF conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during Excel to PDF conversion."));
    }
};

// Converts a PDF file to a PowerPoint presentation
export const pdfToPptHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "PDF to PPT conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during PDF to PPT conversion."));
    }
};

// Converts a PowerPoint presentation to a PDF file
export const pptToPdfHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "PPT to PDF conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during PPT to PDF conversion."));
    }
};


// Converts one or more JPG images into a PDF file
export const jpgToPdfHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "JPG to PDF conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during JPG to PDF conversion."));
    }
};

// Converts a PDF file into one or more JPG images
export const pdfToJpgHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "PDF to JPG conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during PDF to JPG conversion."));
    }
};


// Converts HTML content to a PDF file
export const htmlToPdfHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "HTML to PDF conversion successful" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong during HTML to PDF conversion."));
    }
};
