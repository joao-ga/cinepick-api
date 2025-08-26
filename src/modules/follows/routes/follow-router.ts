import { Router } from "express";
import FollowUserController from "../controllers/follow-user-controller";

const router = Router();

router.post("/follow", FollowUserController.follow);


export default router;
