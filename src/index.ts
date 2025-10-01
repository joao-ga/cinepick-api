import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";

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

// Configura Swagger e rotas
setupSwagger(app);

app.get("/", (_req, res) => {
    res.json({
        message: "Bem-vindo à CinePick API! 🎬",
        documentation: "https://api.biluvm.shop/api-docs",
        version: "1.0.0",
        endpoints: { users: "/users", movies: "/movies", follows: "/follows", reviews: "/reviews" },
    });
});

   // Rotas
    app.use("/users", userRouter);
    app.use("/movies", movieRouter);
    app.use("/follows", followRouter);
    app.use("/reviews", reviewRouter);

async function startServer() {
    try {
        await Promise.all([
            cinepickConnection.asPromise(),
            sampleMflixConnection.asPromise(),
        ]);
        console.log("Todas as conexões foram estabelecidas com sucesso");

        // Lê os certificados emitidos para api.biluvm.shop (Let's Encrypt)
        const DOMAIN = process.env.DOMAIN ?? "api.biluvm.shop";
        const CERT_PATH = process.env.CERT_PATH ?? `/etc/letsencrypt/live/${DOMAIN}`;

        // Tipos explícitos: o https.createServer aceita Buffer
        const key: Buffer  = fs.readFileSync(path.join(CERT_PATH, "privkey.pem"));
        const cert: Buffer = fs.readFileSync(path.join(CERT_PATH, "fullchain.pem"));

        const httpsServer = https.createServer({ key, cert }, app);
        httpsServer.listen(443, () => {
            console.log("✅ CinePick HTTPS na porta 443");
            console.log(`🔗 Docs: https://${DOMAIN}/api-docs`);
        });

        // (Opcional) Porta interna 8000 para saúde/debug local
        const PORT = Number(process.env.PORT) || 8000;
        app.listen(PORT, () => {
            console.log(`ℹ️ CinePick (interno) na porta ${PORT}`);
        });

    } catch (err) {
        console.error("Erro ao iniciar servidor:", err);
        process.exit(1);
    }
}

startServer();