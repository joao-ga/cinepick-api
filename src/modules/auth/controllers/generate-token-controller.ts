import { Request, Response } from "express";
import { AccessPayload, signAccessToken, signRefreshToken } from "../services/generate-token-service";
import { User } from "../../user/entities/user-entity";

class GenerateTokenController {
    static async generate(req: Request, res: Response): Promise<void> {
        const { uid, email, roles } = req.body as { uid?: string; email?: string; roles?: string[] };

        if (!uid) {
            res.status(400).json({ message: "uid é obrigatório" });
            return;
        }

        const payload: AccessPayload = { sub: uid, email, roles };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);
        const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 900;

        try {
            const user = await User.findOne({ uid });

            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }

            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();

            res.status(201).json({ accessToken, refreshToken, expiresIn });
            return;
        } catch (error) {
            console.error("Erro ao atualizar tokens do usuário:", error);
            res.status(500).json({ message: "Não foi possível armazenar os tokens" });
        }
    }
}

export default GenerateTokenController;
