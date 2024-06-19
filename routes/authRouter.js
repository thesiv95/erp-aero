import { Router } from "express";

const authRouter = Router();

authRouter.post('/signin');
authRouter.post('/signin/:new_token');
authRouter.post('/signup');
authRouter.get('/info');
authRouter.get('/logout');

export default authRouter;