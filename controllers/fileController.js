import express from 'express';
import * as FileService from '../services/fileService.js';
import { StatusCodes } from '../consts.js';
import createFile from '../utils/createFileFromTmp.js';
import deleteFileTmp from '../utils/deleteFileFromTmp.js';

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export const uploadFile = async (req, res, next) => {
    try {
        const fileData = req.file;
        const fileCreated = await FileService.uploadFile(fileData);
        createFile(fileData, fileCreated.id); // {id}.{extension}

        return res.status(StatusCodes.created).send({ file: fileCreated });
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
export const listFiles = async (req, res, next) => {
    try {
        const { list_size = 10, page = 1 } = req.query;
        const files = await FileService.listFiles(list_size, page);

        return res.status(StatusCodes.ok).send({ files });
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
export const deleteFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        await FileService.deleteFile(id);

        // rm + unlink requires res.status immediately to finish request
        return deleteFileTmp(id).then(() => res.status(StatusCodes.deleted).send({}));
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
export const getFileInfo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const fileInfo = await FileService.getFileInfo(id);

        return res.status(StatusCodes.ok).send({ fileInfo });
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
export const downloadFile = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundFile = await FileService.downloadFile(id);

        return res.download(foundFile);
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
export const updateFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newFileData = req.file;

        const updatedFile = await FileService.updateFile(id, newFileData);

        return res.status(StatusCodes.ok).send({ updatedFile });
    } catch (error) {
        console.error(error.stack);
        return res.status(StatusCodes.serverError).send({error: error.message});
    }
};