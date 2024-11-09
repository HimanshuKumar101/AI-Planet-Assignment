const Document = require("../models/Document"); //Refers to a MongoDB model for storing documents
const pdfParse = require("pdf-parse"); //A library to extract text from PDF files.
const multer = require("multer"); //A middleware used for handling file uploads.
const axios = require("axios"); //Used to make HTTP requests, particularly to the Hugging Face Inference API.
const fs = require("fs"); //Provides file system utilities to read/write files.

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Configures Multer to save uploaded files to the uploads/ directory. Files will be temporarily stored here.

// Helper function to clean the answer
function cleanAnswer(answer) {
  let cleanedAnswer = answer.trim();
  cleanedAnswer = cleanedAnswer.replace(/\n+/g, " "); // Replace newlines with spaces
  cleanedAnswer = cleanedAnswer.replace(/\s+/g, " "); // Replace multiple spaces with a single space
  return cleanedAnswer;
}

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath); //reads a PDF file from filePath
    const data = await pdfParse(dataBuffer); //extracts text content using pdfparse
    return data.text;
  } catch (error) {
    console.error("Failed to parse PDF:", error);
    throw new Error("Failed to parse PDF file");
  }
}

// Upload PDF and save text to database
exports.uploadPDF = async (req, res) => {
  try {
    // Check if the file was uploaded
    if (!req.file) {
      console.log("No File Uploaded");
      return res
        .status(400)
        .json({ message: "No file uploaded. Please attach a PDF file." });
    }

    const filePath = req.file.path;
    console.log("File uploaded to:", filePath);

    //extract text from the uploaded PDF
    const textContent = await extractTextFromPDF(filePath);

    //save document to mongodb
    const document = new Document({
      filename: req.file.originalname,
      textContent,
    });
    await document.save();

    console.log("Document saved with ID:", document._id); // Log document ID for debugging
    res.json({ documentId: document._id, filename: document.filename });
  } catch (error) {
    console.error("Error in uploadPDF:", error);
    res.status(500).json({ message: error.message });
  }
};

// Answer question using Hugging Face's Inference API
exports.askQuestion = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    console.log("Received documentId:", documentId);

    // Fetch the document from the MongoDB
    const document = await Document.findById(documentId);
    if (!document) {
      console.error("Document not found for ID:", documentId);
      return res.status(404).json({ message: "Document not found" });
    }

    // Check if the document has text content
    if (!document.textContent) {
      console.error("Document text content is missing");
      return res.status(400).json({ message: "Document content is empty" });
    }

    const context = document.textContent.slice(0, 10000);

    // Call Hugging Face's Inference API for question-answering
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        inputs: {
          question,
          context,
        },
      },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
      }
    );

    // Log Hugging Face API response for debugging
    console.log("Hugging Face API response:", hfResponse.data);

    // Check if an answer was returned
    const answer = hfResponse.data.answer;
    if (!answer) {
      console.error("No answer found in API response");
      return res.status(500).json({ message: "No answer returned by API" });
    }

    // Clean the answer before sending it to the frontend
    const cleanedAnswer = cleanAnswer(answer);

    // Return the cleaned answer as a response
    res.json({ answer: cleanedAnswer });
  } catch (error) {
    console.error("Error in askQuestion:", error); // Log the full error
    res
      .status(500)
      .json({
        message: "Error while processing question",
        error: error.message,
      });
  }
};

// Export multer upload configuration for use in routes
exports.upload = upload;
