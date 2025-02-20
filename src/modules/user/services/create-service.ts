import User from "../entities/user-entity";

class CreateService {
    async createUser(data: any): Promise<any> {
        const user = new User(data);
        // fazer validação dos campos
        // fazer validação da resposta do banco
    
        try {
            const createUser = await user.save();
            return createUser;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export default CreateService;