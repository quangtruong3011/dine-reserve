import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT.middleware";

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/user', authenticateJWT, authController.getUser);

export default authRouter;