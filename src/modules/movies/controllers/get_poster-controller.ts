import { Request, Response } from "express";
import GetPoster from "../services/get_poster-service";

class GetPosterController {
    static async getPoster(req: Request, res: Response): Promise<void> {
        try {
            
            const movieName = typeof req.query.title === "string" ? req.query.title : "";
    
            if (!movieName) {
                console.error("Nenhum título de filme foi passado na requisição.");
                res.status(400).json({ message: "Título do filme é obrigatório!" });
                return;
            }
    
            const service = new GetPoster();
            const poster = await service.getPoster(movieName);
    
            if (poster) {
                res.status(200).json(poster);
            } else {
                console.error("Erro ao buscar poster.");
                res.status(400).json({ message: "Erro ao buscar poster" });
            }
        } catch (error) {
            console.error("Erro no controller:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    
}

export default GetPosterController;
