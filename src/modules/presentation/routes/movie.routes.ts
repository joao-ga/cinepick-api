import { Router } from "express";
import { MovieController } from "../controllers/MovieController";

const router = Router();
const movieController = new MovieController();

// Rotas de filmes
router.get('/movies', movieController.getMoviesByGenres.bind(movieController));
router.get('/movies/search', movieController.getMovieByTitle.bind(movieController));
router.get('/genres', movieController.getAllGenres.bind(movieController));

export default router; 