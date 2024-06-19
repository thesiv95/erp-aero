import { Router } from "express";

const latencyRouter = Router();

latencyRouter.get('/', (_req, res) => res.send({ latency: 'this is the latency route' }));

export default latencyRouter;