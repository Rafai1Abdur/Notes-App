// backend/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://rafaiabdur_db_user:Test1234@ac-dmcscqi-shard-00-00.e4odalj.mongodb.net:27017,ac-dmcscqi-shard-00-01.e4odalj.mongodb.net:27017,ac-dmcscqi-shard-00-02.e4odalj.mongodb.net:27017/?ssl=true&replicaSet=atlas-zo6yz8-shard-0&authSource=admin&appName=Cluster0"
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;