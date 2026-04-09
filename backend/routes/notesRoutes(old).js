// --------------------------------------------
// This is the original version of notesRoutes.js with incorrect route parameters for update and delete operations.
// --------------------------------------------

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


//--------------------------------------------
// This is version 2 of notesRoutes.js with correct route parameters for update and delete operations.
//--------------------------------------------
const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/notes", notesController.getNotes);
router.post("/notes", notesController.addNote);
router.put("/notes", notesController.updateNote);
router.delete("/notes", notesController.deleteNote);

module.exports = router;