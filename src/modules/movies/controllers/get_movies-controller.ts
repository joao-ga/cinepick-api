import { Request, Response } from "express";
import GetMoviesService from "../services/get_movies-service";

class GetMoviesController {
    static async getMovies(req:Request, res:Response): Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
            const genres = req.query.genres?.toString().split(",") || [];

            if (genres.length === 0) {
                res.status(400).json({ message: "Genres parameter is required" });
                return;
            }

            const service = new GetMoviesService();
            const moviesList = await service.getMovies(genres, page);

            if(moviesList){
                res.status(200).json(moviesList);
                return;
            }else{              
                res.status(400).json({message: "Erro ao buscar filmes"});
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default GetMoviesController;