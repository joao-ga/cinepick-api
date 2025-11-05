import { Router } from "express";
import FollowUserController from "../controllers/follow-user-controller";
import UnfollowUserController from "../controllers/unfollow-user-controller";
import CheckFollowerController from "../controllers/check-follower-controller";

const router = Router();

// Rotas de seguir usuários
router.post("/follow", FollowUserController.follow);
router.post("/unfollow", (req, res, next) => { void UnfollowUserController.unfollow(req, res).catch(next); });
router.get("/check-follower", CheckFollowerController.checkFollower);

export default router;
