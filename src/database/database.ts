import dotenv from 'dotenv';
import mongoose, { ConnectOptions, Connection } from "mongoose";

dotenv.config();
const password = process.env.DATABASE_PASSWORD;
const name = process.env.DATABASE_NAME;

// string de conexão
const cinepickUri = `mongodb+srv://${name}:${password}@cinepick-cluster.nslne.mongodb.net/cinepick`;
const mflixUri = `mongodb+srv://${name}:${password}@cinepick-cluster.nslne.mongodb.net/sample_mflix`;

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// conexão com o Mongo
const cinepickConnection: Connection = mongoose.createConnection(cinepickUri, clientOptions);
const sampleMflixConnection: Connection = mongoose.createConnection(mflixUri, clientOptions);

cinepickConnection.on("connected", () => console.log("Conectado ao MongoDB (cinepick)"));
sampleMflixConnection.on("connected", () => console.log("Conectado ao MongoDB (sample_mflix)"));

cinepickConnection.on("error", (err) => console.error("Erro na conexão cinepick:", err));
sampleMflixConnection.on("error", (err) => console.error("Erro na conexão sample_mflix:", err));

export { cinepickConnection, sampleMflixConnection };