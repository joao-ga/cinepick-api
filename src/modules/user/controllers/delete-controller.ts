import { Request, Response } from "express";
import DeleteService from "../services/delete-service";

class DeleteUserController {
    static async deleteUser(req: Request, res: Response): Promise<void> {
        try{
            const data = req.body;
            const service = new DeleteService();

            const user = await service.deleteUser(data);

            if(user){
                res.status(201).json(user);
                return;
            }else{
                res.status(400).json({message: "Erro ao deletar usuário"});
                return;
            }
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default DeleteUserController;