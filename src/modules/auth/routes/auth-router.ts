import { Router } from "express";
import GenerateTokenController from "../controllers/generate-token-controller";

const router = Router();

router.post("/token", GenerateTokenController.generate);

export default router;