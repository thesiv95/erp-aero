import File from "../models/File.model.js";
import findFile from "../utils/findFileFromTmp.js";
import replaceFileInTmp from "../utils/replaceFileInTmp.js";

export const uploadFile = async (fileData) => {
  const payload = {
    name: fileData.originalname,
    mimeType: fileData.mimetype,
    size: fileData.size,
  };

  const fileCreated = await File.create(payload);
  return fileCreated;
};

export const listFiles = (list_size, page) => {
  return File.findAll({
    limit: parseInt(list_size),
    offset: (page - 1) * parseInt(list_size),
  });
};

export const deleteFile = (id) => {
  return File.destroy({
    where: {
      id,
    },
    force: true,
  });
};

export const getFileInfo = (id) => {
  return File.findByPk(id);
};

export const downloadFile = async (id) => {
  return findFile(id);
};

export const updateFile = async (id, newFileData) => {

  const payload = {
    name: newFileData.originalname,
    mimeType: newFileData.mimetype,
    size: newFileData.size,
  };

  await File.update(payload, { where: {id} });

  await replaceFileInTmp(newFileData, id);

  return payload;
};
