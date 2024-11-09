// ./config/db.js

//importing moongoose and dotenv libraries
const mongoose = require("mongoose");
require("dotenv").config();

//defining the connectDb function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      //Attempts to connect to MongoDB using mongoose.connect().
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

//Exporting connectDB
module.exports = connectDB;
