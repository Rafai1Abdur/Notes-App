// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON body

// In-memory storage for notes
let notes = [];

// GET /notes → return all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST /notes → add a new note
app.post("/notes", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Note text required" });
  notes.push({ text });
  res.json({ message: "Note added" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});