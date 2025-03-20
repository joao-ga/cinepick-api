import { Router } from "express";
import GetMoviesController from "../controllers/get_movies-controller";
import GetAllGendersController from "../controllers/get_all_genres-controller";

const router = Router()

router.get('/getmovies', GetMoviesController.getMovies);
router.get("/getallgenres", GetAllGendersController.getGenres);

export default router;