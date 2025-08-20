import { Request, Response } from "express";
import GetUserMoviesService from "../services/get_user_movies-service";

class GetUserMoviesController {
    static async GetUserMovies(req:Request, res:Response):Promise<void> {
        const data = req.params;
        try {
            const service = new GetUserMoviesService();
            const movies = await service.getUserMovies(data);

            if(movies) {
                res.status(200).json(movies);
                return;
            } else {
                res.status(400).json({ message: "Erro ao buscar filmes" });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default GetUserMoviesController;