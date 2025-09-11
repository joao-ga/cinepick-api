import { Router } from "express";
import CreateReviewController from "../controllers/create_review-controller";
import GetUserReviewController from "../controllers/get_user_review-controller";
import GetUserFollowersReviewController from "../controllers/get_user_followers_review-controller";
import UpdateReviewController from "../controllers/update_review-controller";
import DeleteReviewController from "../controllers/delete_review-controller";

const router = Router();

// Rotas de avaliações
router.post('/createreview', CreateReviewController.createReview);
router.get('/getuserreview/:uid', GetUserReviewController.getUserReview);
router.get('/getuserfollowersreview/:uid', GetUserFollowersReviewController.getUserFollowersReview);
router.put('/updatereview', UpdateReviewController.updateReview);
router.delete('/deletereview', DeleteReviewController.deleteReview);

export default router;