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
  
  const newNote = { id: Date.now(), text }; // add unique ID
  notes.push(newNote);
  
  res.json(newNote); // return new note to frontend
});

// DELETE /notes → delete a note by text
app.delete("/notes", (req, res) => {
  const { text } = req.body; // get note text from request
  if (!text) return res.status(400).json({ error: "Note text required" });

  const initialLength = notes.length;
  notes = notes.filter(note => note.text !== text); // remove note

  if (notes.length === initialLength) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});