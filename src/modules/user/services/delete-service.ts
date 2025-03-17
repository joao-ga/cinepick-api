import { User } from "../entities/user-entity";
import { Document } from 'mongoose';

class DeleteService{
    async deleteUser(data: any): Promise<Document | null>{
        const uid = data.uid;

        try{
            const deletedUser = await User.findOneAndUpdate(
                {uid: uid}, 
                {active: false},
                {new: true}
            );
            return deletedUser;
        }catch(error){
            console.error("Erro ao atualizar usuário:", error);
            return null;
        }
    }
}

export default DeleteService;