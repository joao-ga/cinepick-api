import { Request, Response } from "express";
import GetGenresService from "../services/get_genres-service";

class GetAllGenresController {
    static async getGenres(req: Request, res: Response): Promise<void> {
        try {
            const service = new GetGenresService();
            const genres = await service.getAllGenres();

            if (genres) {
                res.status(200).json(genres);
                return;
            } else {
                res.status(400).json({ message: "Erro ao buscar gêneros" });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default GetAllGenresController;
