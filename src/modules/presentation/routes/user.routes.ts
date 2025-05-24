import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

// Rotas de usuário
router.post('/users', userController.createUser.bind(userController));
router.get('/users/:uid', userController.getUser.bind(userController));
router.put('/users/:uid', userController.updateUser.bind(userController));
router.delete('/users/:uid', userController.deleteUser.bind(userController));

// Rotas de filmes do usuário
router.put('/users/:uid/movies', userController.addMovies.bind(userController));
router.get('/users/:uid/movies', userController.getUserMovies.bind(userController));

// Rotas de gêneros do usuário
router.put('/users/:uid/genres', userController.addGenres.bind(userController));

export default router; 