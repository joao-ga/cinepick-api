import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cinepickConnection, sampleMflixConnection } from "./database/database";
import userRoutes from "./modules/presentation/routes/user.routes";
import movieRoutes from "./modules/presentation/routes/movie.routes";

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
    app.use("/api", userRoutes);
    app.use("/api", movieRoutes); 

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