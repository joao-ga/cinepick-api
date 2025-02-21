import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();
const password = process.env.DATABASE_PASSWORD;
const name = process.env.DATABASE_NAME;

// string de conexão
const uri = `mongodb+srv://${name}:${password}@cinepick-cluster.nslne.mongodb.net/cinepick`;

const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// conexão com o Mongo
async function connectToMongoDB(): Promise<void> {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("Conectado com sucesso no: mongo cinepick!");
    } catch (err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
}

connectToMongoDB();

export default mongoose;