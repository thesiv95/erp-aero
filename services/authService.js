import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config.js';
import User from '../models/User.model.js';
import generateUserName from '../utils/generateUserName.js';
import Blacklist from "../models/Blacklist.model.js";

const { BCRYPT_SALT_INDEX, JWT_EXPIRES_IN_MINS, JWT_KEY, JWT_KEY_REFRESH } = config;

export const signIn = async (login, password) => {
    const user = await User.findByPk(login);
    if (!user) return null;

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) return null;

    const { id, name } = user;

    const accessToken = jwt.sign({ id, name }, JWT_KEY, { expiresIn: `${JWT_EXPIRES_IN_MINS}m` });

    const refreshToken = jwt.sign({ id }, JWT_KEY_REFRESH, { expiresIn: `${JWT_EXPIRES_IN_MINS}m` });

    return { accessToken, refreshToken };

};

export const signInTokenUpdate = async (refreshToken, userName) => {
    const verified = await jwt.verify(refreshToken, JWT_KEY_REFRESH);
    const id = verified.id;

    return jwt.sign({ id, name: userName }, JWT_KEY, { expiresIn: `${JWT_EXPIRES_IN_MINS}m` });
};

export const signUp = async (login, password) => {
    const passwordEncrypted = await bcrypt.hash(password, +BCRYPT_SALT_INDEX);

    const payload = {
        id: login,
        password: passwordEncrypted,
        name: generateUserName()
    };

    await User.create(payload);

    const accessToken = jwt.sign({ id: login, name: payload.name }, JWT_KEY, { expiresIn: `${JWT_EXPIRES_IN_MINS}m` });

    const refreshToken = jwt.sign({ id: login }, JWT_KEY_REFRESH, { expiresIn: `${JWT_EXPIRES_IN_MINS}m` });

    return { accessToken, refreshToken };
};

export const userLogout = async (token) => {
    return Blacklist.create({ token });
};