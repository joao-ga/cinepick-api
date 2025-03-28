import { Movie } from "../entities/movie-entity";
import { Document } from "mongoose";

class GetMovieByName{

    async getMovieByName(title: string): Promise<Document[] | null> {

        try{
            const movie = await Movie.find({
                title: { $regex: new RegExp(title, "i") }
            }).select("_id fullplot title poster genres runtime");            

            return movie;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default GetMovieByName