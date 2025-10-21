import { Request, Response } from "express";
import { checkAccessToken, checkRefreshToken } from "../services/check-token-service";

class CheckTokenController {
    static check(req: Request, res: Response): void {
        const { token, tokenType } = req.body as { token?: string; tokenType?: 'access' | 'refresh' };

        if (!token) {
            res.status(400).json({ message: "Token é obrigatório" });
            return;
        }

        const type = tokenType || 'access';
        
        let result;
        if (type === 'refresh') {
            result = checkRefreshToken(token);
        } else {
            result = checkAccessToken(token);
        }

        if (result.valid) {
            res.status(200).json({ 
                valid: true, 
                payload: result.payload,
                message: "Token válido" 
            });
        } else {
            res.status(401).json({ 
                valid: false, 
                error: result.error,
                message: "Token inválido" 
            });
        }
    }
}

export default CheckTokenController;