import { Router } from "express";
import * as AuthController from '../controllers/authController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/signin', AuthController.signIn);
authRouter.post('/signin/new_token', authMiddleware, AuthController.signInTokenUpdate);
authRouter.post('/signup', AuthController.signUp);
authRouter.get('/info', authMiddleware, AuthController.userInfo);
authRouter.get('/logout', authMiddleware, AuthController.userLogout);

export default authRouter;