import { Request, Response } from "express";
import CreateService from "../services/create-service";

class CreatUserController {
    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const service = new CreateService();
            const user = await service.createUser(data);
    
            if (user) {
                res.status(201).json(user);
                return;
            } else {
                res.status(400).json({ message: "Erro ao criar usuário" });
                return;
            }
        } catch (error: any) {
            if (error.message && (
                error.message.includes("ausente") || 
                error.message.includes("deve ter") ||
                error.message.includes("já está em uso")
            )) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
            return;
        }
    }
    
}

export default CreatUserController;
