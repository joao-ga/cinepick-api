
import { Router } from "express";
import CreatUserController from "../controllers/create-controller";
const router = Router()

// rota de registro de usuário
router.post('/user/createuser', CreatUserController.createUser);

export default router;
