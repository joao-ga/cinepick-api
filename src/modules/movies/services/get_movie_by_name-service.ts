import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovieByName{

    async getMovieByName(title: string): Promise<Document[] | null> {

        try{
            const movie = await Movie.find({
                title: { $regex: new RegExp(title, "i") }
            }).select("title poster plot fullplot year genres");            

            return movie;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default GetMovieByName