import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class SearchUserService {
    async searchUser(username: string):Promise<Document[] | null> {
        try {

            // To do: Fazer com que usuários com amigos em comum sejam retornados com maior prioridade

            const user = await User.find({
                name: { $regex: new RegExp(`^${username}`, 'i') }
            }).limit(10);
            return user;
        } catch(error) {
            console.error("Erro ao buscar usuário:", error);
            return null;
        }
    }
}

export default SearchUserService;