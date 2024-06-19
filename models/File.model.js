import { DataTypes } from "sequelize";
import sequelize from "../db.js";

/*  название, расширение, MIME type, размер, дата */

const File = sequelize.define(
  "file",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[^\\/:\*\?"<>\|]+(\.[^\\/:\*\?"<>\|]+)*\.[A-Za-z]{3,4}$/
      }
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: true }
);

export default File;
