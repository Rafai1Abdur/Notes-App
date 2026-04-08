const express = require("express");
const cors = require("cors");

const notesRoutes = require("./routes/notesRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", notesRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});