import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class GetUserMovies {
    async getUserMovies(data: any): Promise<Document | null> {
        const uid = data.uid;
        try {
            const movies = await User
                .findOne({ uid: uid })
                .select("movies");

            return movies;

        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GetUserMovies;