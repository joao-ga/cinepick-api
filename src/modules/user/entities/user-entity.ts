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
  movies?: string[];
  active: boolean;
  followersCount: number;
  followingCount: number;
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
    movies: { type: [String], required: false, default: [] },
    active: { type: Boolean, required: true, default: true },
    followersCount: { type: Number, required: true, default: 0 },
    followingCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const User: Model<IUser> = cinepickConnection.model<IUser>("User", UserSchema);