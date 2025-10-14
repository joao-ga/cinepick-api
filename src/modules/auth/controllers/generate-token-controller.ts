import { Request, Response } from "express";
import { AccessPayload, signAccessToken, signRefreshToken } from "../services/generate-token-service";

class GenerateTokenController {
    static generate(req: Request, res: Response): void {
        const { uid, email, roles } = req.body as { uid?: string; email?: string; roles?: string[] };

        if (!uid) {
            res.status(400).json({ message: "uid é obrigatório" });
            return;
        }

        const payload: AccessPayload = { sub: uid, email, roles };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);
        const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 900;

        res.status(201).json({ accessToken, refreshToken, expiresIn });
        return;
    }
}

export default GenerateTokenController;