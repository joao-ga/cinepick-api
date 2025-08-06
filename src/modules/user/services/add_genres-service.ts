import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class AddGenresService {
    async handleGenres(data: any): Promise<Document | null> {
        const genres: Array<string> = data.genres;
        const uid: string = data.uid;
        try {
            const userWithGenres = await User.findOneAndUpdate(
                { uid: uid },
                { movieGender: genres },
                { new: true }
            );
            return userWithGenres;
        } catch(error) {
            console.error("Erro ao adicionar gêneros:", error);
            return null;
        }
    }
}

export default AddGenresService;