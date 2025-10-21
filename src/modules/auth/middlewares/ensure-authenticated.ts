import { NextFunction, Request, Response } from "express";
import { AccessPayload } from "../services/generate-token-service";
import { checkAccessToken } from "../services/check-token-service";

type RequestWithUser = Request & { user?: AccessPayload };

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Token de acesso não informado" });
        return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme?.toLowerCase() !== "bearer" || !token) {
        res.status(401).json({ message: "Cabeçalho de autorização inválido" });
        return;
    }

    const validation = checkAccessToken(token);

    if (!validation.valid || !validation.payload) {
        res.status(401).json({ message: validation.error || "Token inválido" });
        return;
    }

    (req as RequestWithUser).user = validation.payload;
    res.locals.user = validation.payload;
    next();
}
