import { Router } from "express";
import FollowUserController from "../controllers/follow-user-controller";
import UnfollowUserController from "../controllers/unfollow-user-controller";
import FollowEachOtherController from "../controllers/follow_each_other-controller";

const router = Router();

// Rotas de seguir usuários
router.post("/follow", FollowUserController.follow);
router.post("/unfollow", (req, res, next) => { void UnfollowUserController.unfollow(req, res).catch(next); });
router.get("/follow-each-other", (req, res, next) => { void FollowEachOtherController.followEachOther(req, res).catch(next); });

export default router;
