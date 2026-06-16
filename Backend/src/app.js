import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});