const express = require("express");
const router = express.Router();

const {
  getNotes,
  addNote,
  deleteNote,
  updateNote
} = require("../controllers/notesController");

router.get("/notes", getNotes);
router.post("/notes", addNote);
router.delete("/notes", deleteNote);
router.put("/notes", updateNote);

module.exports = router;