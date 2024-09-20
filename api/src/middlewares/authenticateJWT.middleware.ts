import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface CustomRequest extends Request {
    user?: { id: number };
}

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).send({ message: "Unauthorized" });
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token as string, secretKey as string);
        req.user = decoded as unknown as { id: number };
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized" });
    }
};