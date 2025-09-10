import { Router } from "express";
import GetMoviesController from "../controllers/get_movies-controller";
import GetAllGendersController from "../controllers/get_all_genres-controller";
import GetMovieByNameController from "../controllers/get_movie_by_name-controller";

const router = Router()

// Rotas de filmes
router.get('/getmovies', GetMoviesController.getMovies);
router.get("/getallgenres", GetAllGendersController.getGenres);
router.get("/getmoviebyname", GetMovieByNameController.getMovieByName);

export default router;