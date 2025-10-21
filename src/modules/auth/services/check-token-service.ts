import jwt from "jsonwebtoken";
import { AccessPayload } from "./generate-token-service";

const JWT_SECRET: string = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-me";

export function checkAccessToken(token: string): { valid: boolean; payload?: AccessPayload; error?: string } {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AccessPayload;
        return { valid: true, payload: decoded };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { valid: false, error: "Token expired" };
        } else if (error instanceof jwt.JsonWebTokenError) {
            return { valid: false, error: "Invalid token" };
        } else {
            return { valid: false, error: "Token verification failed" };
        }
    }
}

export function checkRefreshToken(token: string): { valid: boolean; payload?: AccessPayload; error?: string } {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as AccessPayload;
        return { valid: true, payload: decoded };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { valid: false, error: "Refresh token expired" };
        } else if (error instanceof jwt.JsonWebTokenError) {
            return { valid: false, error: "Invalid refresh token" };
        } else {
            return { valid: false, error: "Refresh token verification failed" };
        }
    }
}

export function checkToken(token: string, tokenType: 'access' | 'refresh' = 'access'): boolean {
    const result = tokenType === 'access' ? checkAccessToken(token) : checkRefreshToken(token);
    return result.valid;
}