import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from './database/database';
import userRouter from "./modules/user/routes/user-router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose;

// routes
app.use('/users', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
