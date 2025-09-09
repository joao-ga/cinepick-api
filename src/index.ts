import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cinepickConnection, sampleMflixConnection } from "./database/database";
import userRouter from "./modules/user/routes/user-router";
import movieRouter from "./modules/movies/router/movie-router";
import followRouter from "./modules/follows/routes/follow-router";
import reviewRouter from "./modules/review/routes/review-routes";
import { setupSwagger } from "./swagger.config";

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

    // Configurar Swagger
    setupSwagger(app);

    // Rota de boas-vindas
    app.get("/", (req, res) => {
      res.json({
        message: "Bem-vindo à CinePick API! 🎬",
        documentation: "http://localhost:8000/api-docs",
        version: "1.0.0",
        endpoints: {
          users: "/users",
          movies: "/movies", 
          follows: "/follows",
          reviews: "/reviews"
        }
      });
    });

    // Rotas
    app.use("/users", userRouter);
    app.use("/movies", movieRouter);
    app.use("/follows", followRouter);
    app.use("/reviews", reviewRouter);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Servidor CinePick rodando na porta ${PORT}`);
      console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
      console.log(`API disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

startServer();