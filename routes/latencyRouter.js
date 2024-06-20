import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const latencyRouter = Router();

latencyRouter.use(authMiddleware);
latencyRouter.get('/', (_req, res) => res.send({ latency: 'this is the latency route' }));

export default latencyRouter;