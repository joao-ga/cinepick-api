import { Router } from "express";
import GetMoviesController from "../controllers/get_movies-controller";
import GetPosterController from "../controllers/get_poster-controller";

const router = Router()
console.log("Configuração do roteador '/movies' iniciada.");

router.get('/getmovies', GetMoviesController.getMovies);
router.get('/getposter', GetPosterController.getPoster);
  
export default router;