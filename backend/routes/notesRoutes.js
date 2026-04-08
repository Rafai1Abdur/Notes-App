/* const express = require("express");
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

*/

const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/notes", notesController.getNotes);
router.post("/notes", notesController.addNote);
router.put("/notes", notesController.updateNote);
router.delete("/notes", notesController.deleteNote);

module.exports = router;