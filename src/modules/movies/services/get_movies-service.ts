import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovies {
    async getMovies(gentres: any): Promise<Document[] | null> {
        const genres = gentres;
        try {
            const movies = await Movie.find({ genres: { $in: genres } });
            return movies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GetMovies;