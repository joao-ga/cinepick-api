import jwt from "jsonwebtoken";

export type AccessPayload = {
    sub: string; // user id
    email?: string;
    roles?: string[];
};

const JWT_SECRET: string = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-me";

// Use expirações em segundos (TS-friendly)
const JWT_EXPIRES_IN: number = Number(process.env.JWT_EXPIRES_IN) || 900; // 15m
const JWT_REFRESH_EXPIRES_IN: number = Number(process.env.JWT_REFRESH_EXPIRES_IN) || (60 * 60 * 24 * 7); // 7d

export function signAccessToken(payload: AccessPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function signRefreshToken(payload: AccessPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}