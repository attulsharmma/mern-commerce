import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NOT_AUTHORIZED_ERROR_MESSAGE } from "../constants/index.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

    // Read token from cookie
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: NOT_AUTHORIZED_ERROR_MESSAGE
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded; // attach decoded token to request
        next(); // allow request to continue
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: NOT_AUTHORIZED_ERROR_MESSAGE
        });
    }
};
