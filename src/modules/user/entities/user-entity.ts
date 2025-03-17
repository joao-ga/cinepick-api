import { Schema, Document, Model } from "mongoose";
import { cinepickConnection } from "../../../database/database"; // Importando conexão correta
interface IUser extends Document {
  name: string;
  gender: string;
  email: string;
  birth: string;
  phone: string;
  uid?: string;
  movieGender?: string[];
  movieSubGender?: string[];
  active: boolean;
}

// Definição do Schema do Usuário
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birth: { type: String, required: true },
    phone: { type: String, required: true },
    uid: { type: String },
    movieGender: { type: [String], required: false },
    movieSubGender: { type: [String], required: false },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const User: Model<IUser> = cinepickConnection.model<IUser>("User", UserSchema);