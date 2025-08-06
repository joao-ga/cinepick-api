import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovies {
    async getMovies(gentres: any, page: number): Promise<Document[] | null> {
        const limit = 20;
        const genres = gentres;
        const skip = (page - 1) * limit;
        try {

            const movies = await Movie
            .find(
                { 
                    genres: { $in: genres },
                    year: { $gte: 2000 },
                    "imdb.rating": { $gte: 5 },
                    "imdb.votes": { $gte: 300 },
                    type: "movie",
                    "awards.wins": { $gte: 1 },
                    "tomatoes.viewer.rating": { $gte: 4 },
                    runtime: { $gte: 90 },
                    poster: { $exists: true, $ne: null }
                }
            )
            .select("_id fullplot title poster genres runtime")
            .sort({"imdb.rating": -1})
            .skip(skip)
            .limit(limit);

            return movies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GetMovies;