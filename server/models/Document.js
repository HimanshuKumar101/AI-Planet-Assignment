//Importing Mongoose
const mongoose = require("mongoose");

//Defining the Document Schema
const DocumentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  textContent: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

//Exporting the Model
module.exports = mongoose.model("Document", DocumentSchema);
