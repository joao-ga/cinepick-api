// array de filmes 
import { Request, Response} from "express";
import RecommendMovieService from "../services/recommend-movie-service";

class RecommendMovieController {
    static async handleRecommendMovie(req: Request, res: Response): Promise<void> {
        const userMovies = req.body.movies;
        try {
            const service = new RecommendMovieService();
            const recommendedMovies = await service.recommendMovies(userMovies);

            if (recommendedMovies) {
                res.status(200).json(recommendedMovies);
                return;
            } else {
                res.status(400).json({message: "Erro ao recomendar filmes"});
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}

export default RecommendMovieController;
