//Importing Dependencies
require("dotenv").config();
const express = require("express"); //Imports the Express framework, which simplifies setting up the server and defining routes.
const mongoose = require("mongoose"); // Imports Mongoose, a library used for connecting and interacting with MongoDB.
const cors = require("cors"); //Imports the CORS middleware, enabling Cross-Origin Resource Sharing, allowing the API to be accessed from other domains.
const pdfRoutes = require("./routes/pdfRoutes"); //Imports the route definitions from pdfRoutes, which contain specific routes for handling PDF uploads and processing.

//Setting Up Express App and Port
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors()); //frontend applications to access this API.
app.use(express.json()); //Parses incoming JSON payloads, allowing the server to handle JSON-formatted requests, which is typical in REST APIs.

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Defining Routes
app.use("/api/pdf", pdfRoutes);

//Starting the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
