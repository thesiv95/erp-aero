import path from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import { tmpFolderName } from '../consts.js';


const tmpFolder = [path.dirname(""), tmpFolderName];

const createFolderIfNotExist = () => {
  try {
    mkdirSync(path.resolve(...tmpFolder));
  } catch (error) {
    if (error.stack.includes('EEXIST')) return;
  }
};

const createFile = (fileData, fileId) =>{
    let extension = fileData.originalname.split('.');
    extension = extension[extension.length - 1];

    createFolderIfNotExist();

    const tempFile = createWriteStream(
      // temporary just for upload
      path.resolve(...tmpFolder, `${fileId}.${extension.toLowerCase()}`)
    );

    tempFile.write(fileData.buffer);
    tempFile.on("finish", () => tempFile.close());
};




export default createFile;