import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class CreateService {
    async createUser(data: any): Promise<Document | null> {

        data.username = data.username?.trim();
        data.email = data.email?.trim();
        data.name = data.name?.trim();

        const user = new User(data);

        try {
            
            if (!data.username){
                throw new Error("Nome ausente!")
            }
            else if (!data.name){
                throw new Error("Nome ausente!")
            }
            else if (!data.username){
                throw new Error("Username ausente!")
            }
            else if(!data.gender){
                throw new Error("Gênero ausente!")
            }
            else if(!data.email){
                throw new Error("Email ausente!")
            }
            else if(!data.birth){
                throw new Error("Data ausente!")
            }
            else if(!data.phone){
                throw new Error("Número ausente!")
            }

            const createUser = await user.save();
            return createUser;

        } catch (err: any) {
            console.error(err);
            
            if (err.code === 11000 && err.keyPattern?.username) {
                throw new Error("Esse username já está em uso! Escolha outro.");
            }
            
            if (err.code === 11000 && err.keyPattern?.email) {
                throw new Error("Esse email já está em uso! Escolha outro.");
            }
            
            return null;
        }
    }
}

export default CreateService;