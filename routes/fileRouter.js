import multer from 'multer';
import { Router } from 'express';
import * as FileController from '../controllers/fileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const upload = multer({ storage: multer.memoryStorage() });

const fileRouter = Router();

fileRouter.use(authMiddleware);
fileRouter.post('/upload', upload.single('filename'), FileController.uploadFile);
fileRouter.get('/list', FileController.listFiles);
fileRouter.delete('/delete/:id', FileController.deleteFile);
fileRouter.get('/:id', FileController.getFileInfo);
fileRouter.get('/download/:id', FileController.downloadFile);
fileRouter.put('/update/:id', upload.single('filename'), FileController.updateFile);

export default fileRouter;