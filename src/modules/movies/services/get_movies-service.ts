import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovies {
    async getMovies(gentres: any): Promise<Document[] | null> {
        const genres = gentres;
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
            .select("_id fullplot title poster genres")
            .sort({"imdb.rating": -1})
            .limit(20);

            return movies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GetMovies;