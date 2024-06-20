import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import config from './config.js';
import routes from './routes/index.js';
import sequelize from './db.js';
import { StatusCodes } from './consts.js';

const { EXPRESS_PORT } = config;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/latency', routes.latencyRouter);
app.use('/api/auth', routes.authRouter);
app.use('/api/file', routes.fileRouter);
app.use('*', (_req, res) => res.status(StatusCodes.notFound).send({ error: 'Page not found' }));

sequelize.sync().then(() => console.log('[DB]: tables refreshed or initialized'));

app.listen(EXPRESS_PORT, () => console.log(`[app]: started on ${EXPRESS_PORT}`));