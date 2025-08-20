import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class AddMoviesService {
    async addMovies(data: any): Promise<Document | null> {
        const movies: Array<string> = data.movies;
        const uid: string = data.uid;
        try {
            const userWithMovies = await User.findOneAndUpdate(
                { uid: uid },
                { movies: movies },
                { new: true }
            );
            return userWithMovies;
        } catch(error) {
            console.error("Erro ao adicionar filmes:", error);
            return null;
        }
    }
}

export default AddMoviesService;