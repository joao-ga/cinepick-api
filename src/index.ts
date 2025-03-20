import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cinepickConnection, sampleMflixConnection } from "./database/database";
import userRouter from "./modules/user/routes/user-router";
import movieRouter from "./modules/movies/router/movie-router";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// função para esperar as conexões antes de iniciar o servidor
async function startServer() {
  try {
    await Promise.all([
      cinepickConnection.asPromise(),
      sampleMflixConnection.asPromise(),
    ]);

    console.log("Todas as conexões foram estabelecidas com sucesso");

    // Rotas
    app.use("/users", userRouter);
    app.use('/movies', movieRouter);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

startServer();