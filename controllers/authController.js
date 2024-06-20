import express from 'express';
import * as AuthService from '../services/authService.js';
import { StatusCodes } from '../consts.js';

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const signIn = async (req, res, next) => {
    try {
        let accessToken, refreshToken;
        const { login, password } = req.body;

        const user = await AuthService.signIn(login, password);
        if (!user) {
            throw new Error('No such user or password');
        } else {
            accessToken = user.accessToken; 
            refreshToken = user.refreshToken;
        }

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log('[app]: cookies set');

        return res.status(StatusCodes.created).send({ accessToken });
    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const signInTokenUpdate = async (req, res, next) => {
    try {
        if (!req.cookies && !req.cookies.jwt) {
            return res.status(StatusCodes.unauthorized).send({ error: 'Cookies are unset' });
        }

        const refreshToken = req.cookies.jwt;
        console.log(refreshToken)

        const accessToken = await AuthService.signInTokenUpdate(refreshToken, req.user.name);

        return res.status(StatusCodes.created).send({ accessToken });
    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const signUp = async (req, res, next) => {
    try {
        const { login, password } = req.body;

        const { accessToken, refreshToken } = await AuthService.signUp(login, password);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log('[app]: cookies set');

        return res.status(StatusCodes.created).send({ accessToken });


    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const userInfo = (req, res, next) => {
    try {
        const userId = req.user.id;
        return res.status(StatusCodes.ok).send({ userId });
    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const userLogout = async (req, res, next) => {
    try {
        // we can't directly revoke a token (it is impossible), but can add it to a blacklist table
        // next time when we login, we check if a token is in this blacklist
        const token = req.token;
        await AuthService.userLogout(token);

        return res.send({});
    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};