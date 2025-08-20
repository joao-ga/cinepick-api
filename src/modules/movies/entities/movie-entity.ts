import { Schema, Document, Model } from "mongoose";
import { sampleMflixConnection } from "../../../database/database";

interface Movie extends Document {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating?: number;
    votes?: number;
    id?: number;
  };
  countries: string[];
  type: string;
  tomatoes?: object;
  num_mflix_comments: number;
}

const MovieSchema = new Schema<Movie>(
  {
    plot: { type: String, required: true },
    genres: { type: [String], required: true },
    runtime: { type: Number, required: true },
    cast: { type: [String], required: true },
    poster: { type: String },
    title: { type: String, required: true },
    fullplot: { type: String },
    languages: { type: [String], required: true },
    released: { type: Date },
    directors: { type: [String] },
    rated: { type: String },
    awards: {
      wins: { type: Number },
      nominations: { type: Number },
      text: { type: String },
    },
    lastupdated: { type: String },
    year: { type: Number, required: true },
    imdb: {
      rating: { type: Number },
      votes: { type: Number },
      id: { type: Number },
    },
    countries: { type: [String] },
    type: { type: String, required: true },
    tomatoes: { type: Object },
    num_mflix_comments: { type: Number, default: 0 },
  },
  { timestamps: false }
);

export const Movie: Model<Movie> = sampleMflixConnection.model<Movie>("movies", MovieSchema);
