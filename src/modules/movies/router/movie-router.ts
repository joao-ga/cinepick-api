import { Router } from "express";
import GetMoviesController from "../controllers/get_movies-controller";

const router = Router()

router.get('/getmovies', GetMoviesController.getMovies);

export default router;