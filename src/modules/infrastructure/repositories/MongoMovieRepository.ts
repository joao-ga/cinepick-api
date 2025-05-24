import { Document, Model, Schema } from "mongoose";
import { IMovieRepository } from "../../core/domain/interfaces/IMovieRepository";
import { sampleMflixConnection } from "../../../database/database";
import { IMovie } from "../../core/domain/entities/Movie";

const MovieSchema = new Schema<IMovie>({
    plot: { type: String, required: true },
    genres: { type: [String], required: true },
    runtime: { type: Number, required: true },
    cast: { type: [String], required: true },
    poster: { type: String, required: false },
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
    year: { type: Number, required: true },
    imdb: {
        rating: { type: Number },
        votes: { type: Number },
        id: { type: Number },
    },
    countries: { type: [String] },
    type: { type: String, required: true },
    tomatoes: { type: Object },
}, { timestamps: true });

const MovieModel = sampleMflixConnection.model<IMovie>("movies", MovieSchema);

export class MongoMovieRepository implements IMovieRepository {
    private model: Model<IMovie>;

    constructor() {
        this.model = MovieModel;
    }

    async findByGenres(genres: string[], page: number, limit: number): Promise<Document[] | null> {
        try {
            const skip = (page - 1) * limit;
            const query = {
                genres: { $in: genres },
                year: { $gte: 2000 },
                "imdb.rating": { $gte: 5 },
                "imdb.votes": { $gte: 300 },
                type: "movie",
                "awards.wins": { $gte: 1 },
                "tomatoes.viewer.rating": { $gte: 4 },
                runtime: { $gte: 90 },
                poster: { $exists: true, $ne: null }
            };

            // Primeiro vamos contar quantos documentos correspondem à query
            const count = await this.model.countDocuments(query);

            const movies = await this.model
                .find(query)
                .select("_id fullplot title poster genres runtime")
                .sort({ "imdb.rating": -1 })
                .skip(skip)
                .limit(limit);

            return movies;
        } catch (error) {
            console.error('Error in findByGenres:', error);
            return null;
        }
    }

    async findByTitle(title: string): Promise<Document[] | null> {
        try {
            const movies = await this.model
                .find({
                    title: { $regex: new RegExp(title, "i") }
                })
                .select("_id fullplot title poster genres runtime");

            return movies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllGenres(): Promise<string[] | null> {
        try {
            const genres = await this.model.aggregate([
                { $unwind: "$genres" },
                { $group: { _id: "$genres" } },
                { $project: { _id: 0, genre: "$_id" } }
            ]);

            return genres.map((genre: any) => genre.genre);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

} 