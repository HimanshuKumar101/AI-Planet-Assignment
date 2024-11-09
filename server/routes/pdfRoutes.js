//Importing Dependencies

const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

// Route for uploading PDFs
router.post(
  "/upload",
  pdfController.upload.single("file"),
  pdfController.uploadPDF
);
router.post("/ask", pdfController.askQuestion);

//Exporting the Router
module.exports = router;
