const Note = require("../Note");

// GET /notes → return all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
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

// DELETE /notes/:id → delete a note by ID
exports.deleteNote = async (req, res) => {
  const { id } = req.params; // 🔹 get ID from URL

  if (!id) return res.status(400).json({ error: "Note ID required" });

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /notes/:id → update a note by ID
exports.updateNote = async (req, res) => {
  const { id } = req.params; // 🔹 get ID from URL
  const { text } = req.body;

  if (!id || !text) return res.status(400).json({ error: "ID and text required" });

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { text },
      { new: true } // return updated note
    );

    if (!updatedNote) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};