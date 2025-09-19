import { Request, Response } from "express";
import GetFirstLoginService from "../services/get_first_login-service";

class GetFirstLoginController {
    static async getFirstLogin(req: Request, res: Response): Promise<void> {
        const data = req.params;
        try {
            const service = new GetFirstLoginService();
            const firstLogin = await service.getFirstLogin(data);
            res.status(200).json(firstLogin);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default GetFirstLoginController;