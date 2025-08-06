import { User } from "../entities/user-entity";
import { Document } from "mongoose";

class UpdateService {
    async updateUser(data: any): Promise<Document | null> {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { uid: data.uid },
                data,
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return null;
        }
    }
}

export default UpdateService;
