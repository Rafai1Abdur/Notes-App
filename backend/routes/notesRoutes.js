const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

// GET all notes
router.get("/notes", notesController.getNotes);

// ADD a note
router.post("/notes", notesController.addNote);

// UPDATE a note by ID
router.put("/notes/:id", notesController.updateNote);

// DELETE a note by ID
router.delete("/notes/:id", notesController.deleteNote);

module.exports = router;