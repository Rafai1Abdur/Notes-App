const fs = require("fs");
// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON body

// In-memory storage for notes
//let notes = [];
let notes = JSON.parse(fs.readFileSync("data/notes.json"));

const saveNotes = () => {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
};

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
  saveNotes(); // save to file
  
  res.json(newNote); // return new note to frontend
});

// DELETE /notes → delete a note by ID
app.delete("/notes", (req, res) => {
  const { id } = req.body; // 🔹 use id instead of text

  if (!id) return res.status(400).json({ error: "Note ID required" });

  const initialLength = notes.length;

  notes = notes.filter(note => note.id !== id); // 🔹 compare by id
  saveNotes(); // save to file

  if (notes.length === initialLength) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json({ message: "Note deleted" });
});

// PUT /notes → update a note by ID
  app.put("/notes", (req, res) => {
    console.log("UPDATE REQUEST:", req.body);
  const { id, text } = req.body;

  if (!id || !text) {
    return res.status(400).json({ error: "ID and text required" });
  }

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.text = text; // 🔹 update text

  saveNotes(); // 🔹 save to file

  res.json({ message: "Note updated", note });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});