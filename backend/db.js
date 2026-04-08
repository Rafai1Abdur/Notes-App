// backend/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rafaiabdur_db_user:NoteApp12345@cluster0.e4odalj.mongodb.net/?appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;