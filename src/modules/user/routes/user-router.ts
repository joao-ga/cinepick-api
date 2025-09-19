import { Router } from "express";
import CreatUserController from "../controllers/create-controller";
import GetUserController from "../controllers/get-controller";
import UpdateUserController from "../controllers/update-controller";
import DeleteUserController from "../controllers/delete-controller";
import AddGenresController from "../controllers/add_genres-controller";
import AddMoviesController from "../controllers/add_movies-controller";
import GetUserMovies from "../controllers/get_user_movies-controller";
import RecommendMovieController from "../controllers/recommend-movie-controller";
import SearchUserController from "../controllers/search_user-controller";
import UserFolloweesMoviesController from "../controllers/get-followees-movies-controller";
import GetFirstLoginController from "../controllers/get_first_login-controller";

const router = Router()

// Rotas de usuários
router.post('/createuser', CreatUserController.createUser);
router.get('/getuser/:uid', GetUserController.getUser);
router.put('/updateuser', UpdateUserController.updateUser);
router.put('/deleteuser', DeleteUserController.deleteUser);
router.put('/addgenres', AddGenresController.handleGenres);
router.put('/addmovies', AddMoviesController.handleMovies);
router.get('/getusermovies/:uid', GetUserMovies.GetUserMovies);
router.post('/recommend', RecommendMovieController.handleRecommendMovie);
router.get('/searchuser', SearchUserController.searchUser);
router.get('/followeesmovies', UserFolloweesMoviesController.getFolloweesMovies);
router.get('/firstlogin/:uid', GetFirstLoginController.getFirstLogin);

export default router;
