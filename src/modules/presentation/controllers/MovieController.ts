import { Request, Response } from "express";
import { MovieService } from "../../application/services/MovieService";

export class MovieController {
    private service: MovieService;

    constructor() {
        this.service = new MovieService();
    }

    async getMoviesByGenres(req: Request, res: Response): Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
            const genres = req.query.genres?.toString().split(",") || [];

            if (genres.length === 0) {
                res.status(400).json({ message: "Genres parameter is required" });
                return;
            }

            const movies = await this.service.getMoviesByGenres(genres, page);

            if (movies) {
                res.status(200).json(movies);
            } else {
                res.status(400).json({ message: "Erro ao buscar filmes" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getMovieByTitle(req: Request, res: Response): Promise<void> {
        try {
            const title = req.query.title?.toString();

            if (!title) {
                res.status(400).json({ message: "Title parameter is required" });
                return;
            }

            const movie = await this.service.getMovieByTitle(title);

            if (movie && movie.length > 0) {
                res.status(200).json(movie);
            } else {
                res.status(404).json({ message: "Filme não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getAllGenres(req: Request, res: Response): Promise<void> {
        try {
            const genres = await this.service.getAllGenres();

            if (genres) {
                res.status(200).json(genres);
            } else {
                res.status(400).json({ message: "Erro ao buscar gêneros" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

} 