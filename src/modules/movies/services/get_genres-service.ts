import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovies {
    async getAllGenres(): Promise<string[] | null> {
        try {
            const genres = await Movie.aggregate([
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

export default GetMovies;
