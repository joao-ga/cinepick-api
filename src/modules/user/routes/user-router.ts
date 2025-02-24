
import { Router } from "express";
import CreatUserController from "../controllers/create-controller";
import GetUserController from "../controllers/get-controller";
import UpdateUserController from "../controllers/update-controller";
import DeleteUserController from "../controllers/delete-controller";
const router = Router()

// rota de registro de usuário
router.post('/createuser', CreatUserController.createUser);
router.get('/getuser/:uid', GetUserController.getUser);
router.put('/updateuser', UpdateUserController.updateUser);
router.put('/deleteuser', DeleteUserController.deleteUser);
export default router;
