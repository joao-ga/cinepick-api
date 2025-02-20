import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from './database/database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose;

app.get("/", (req, res) => {
  res.send("API está rodando! 🚀");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
