import { Router } from "express";
import GenerateTokenController from "../controllers/generate-token-controller";
import CheckTokenController from "../controllers/check-token-controller";

const router = Router();

router.post("/token", GenerateTokenController.generate);
router.post("/check-token", CheckTokenController.check);

export default router;