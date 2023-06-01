//DB_CONNECTION_STRING = This is the key to access db connection string.
const mongoose = require("mongoose");
const HttpError = require("../models/Http-Error");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Something going wrong with database connection");
  }
};

module.exports = connectToDatabase;
