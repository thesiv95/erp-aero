import path from "path";
import { readdir, rm } from "fs/promises";
import { tmpFolderName } from "../consts.js";

const tmpFolder = [path.dirname(""), tmpFolderName];

const findFile = async (id) => {

  const filesList = await readdir(path.resolve(...tmpFolder));

  const file = filesList.find((file) => {
    return file.split('.')[0] == id
  })

  return path.resolve(...tmpFolder, file);
};

export default findFile;