import express from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from '../consts.js';
import config from '../config.js';
import Blacklist from '../models/Blacklist.model.js';

const { JWT_KEY, JWT_EXPIRES_IN_MINS } = config;

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const authMiddleware = async (req, res, next) => {
    try {
       const authorization = req.headers.authorization || req.headers['Authorization'];
       const [type, token] = authorization.split(' '); // Bearer blabla
        if (type !== 'Bearer') throw new Error();

        const tokenUsed = await Blacklist.findOne({where: { token }});
        if (tokenUsed) throw new Error();

        const decodedUser = jwt.verify(token, JWT_KEY);



        req.user = decodedUser; // id (email), name
        req.token = token; // for logout

        next();

    } catch (error) {
       console.error('authMiddleware', error);
       return res.status(StatusCodes.unauthorized).send({ error: 'Unauthorized!' });
    }
};

export default authMiddleware;

