import express from "express";
import dotenv from "dotenv";

dotenv.config();

const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>${NAME}</h1>
    <p><strong>Version:</strong> ${VERSION}</p>
    <p><strong>Description:</strong> ${DESCRIPTION}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`${NAME} version ${VERSION} is running on http://localhost:${PORT}`);
});