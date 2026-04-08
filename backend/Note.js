const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // optional: track createdAt/updatedAt

module.exports = mongoose.model("Note", noteSchema);