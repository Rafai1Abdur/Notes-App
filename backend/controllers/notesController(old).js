//------------------------------------------
// Notes Controller (Old Version)
//------------------------------------------
const fs = require("fs");

// In-memory storage for notes
let notes = JSON.parse(fs.readFileSync("data/notes.json"));

// Save notes to file
const saveNotes = () => {
  fs.writeFileSync("data/notes.json", JSON.stringify(notes, null, 2));
};

// GET /notes → return all notes
exports.getNotes = (req, res) => {
  res.json(notes);
};

exports.addNote = (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Note text required" });

  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  saveNotes();

  res.json(newNote);
};

// DELETE /notes → delete a note by ID
exports.deleteNote = (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Note ID required" });

  const initialLength = notes.length;

  notes = notes.filter(note => note.id !== id);
  saveNotes();

  if (notes.length === initialLength) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json({ message: "Note deleted" });
};

// PUT /notes → update a note by ID
exports.updateNote = (req, res) => {
  console.log("UPDATE REQUEST:", req.body);

  const { id, text } = req.body;

  if (!id || !text) {
    return res.status(400).json({ error: "ID and text required" });
  }

  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.text = text;
  saveNotes();

  res.json({ message: "Note updated", note });
};


//-------------------------------------------
// Notes Controller V2 (New Version with Async/Await)
//--------------------------------------------

const Note = require("../Note");

// GET /notes → return all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // fetch all notes from MongoDB
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /notes → add a new note
exports.addNote = async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Note text required" });

  try {
    const newNote = await Note.create({ text });
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /notes → delete a note by ID
exports.deleteNote = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "Note ID required" });

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /notes → update a note by ID
exports.updateNote = async (req, res) => {
  const { id, text } = req.body;

  if (!id || !text) return res.status(400).json({ error: "ID and text required" });

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { text },
      { new: true } // return the updated document
    );

    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};