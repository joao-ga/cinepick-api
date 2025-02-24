import { Request, Response } from "express";
import GetService from "../services/get-service";

class GetUserController { 
    static async getUser(req: Request, res: Response): Promise<void> {
        const data = req.params;
        console.log(req.params);
        const service = new GetService();

        try {
            const user = await service.getUser(data);

            if(user) {
                res.status(201).json(user);
                return;
            } else {
                res.status(400).json({ message: "Erro ao buscar usuário" });
                return;
            }
        } catch(error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default GetUserController;