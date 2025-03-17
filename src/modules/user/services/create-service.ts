import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class CreateService {
    async createUser(data: any): Promise<Document | null> {
        const user = new User(data);

        try {
            
            if (!data.name){
                throw new Error("Nome ausente!")
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
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default CreateService;