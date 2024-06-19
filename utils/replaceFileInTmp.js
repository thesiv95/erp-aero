import createFile from "./createFileFromTmp.js";
import deleteFileFromTmp from "./deleteFileFromTmp.js";

const replaceFileInTmp = async (fileData, id) => {
    return deleteFileFromTmp(id).then(() => createFile(fileData, id));
};  

export default replaceFileInTmp;