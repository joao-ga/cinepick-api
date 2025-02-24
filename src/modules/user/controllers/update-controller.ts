import { Request, Response } from "express";
import UpdateService from "../services/update-service";


class UpdateUserController {
    static async updateUser(req: Request, res: Response): Promise<void> {
        try{
            const data = req.body;
            const service = new UpdateService();
            const user = await service.updateUser(data);

            if(user){
                res.status(201).json(user);
                return;
            }else{
                res.status(400).json({message: "Erro ao atualizar usuário"});
                return;
            }
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default UpdateUserController;