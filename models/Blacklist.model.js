import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Blacklist = sequelize.define(
  "blacklist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  },
  { timestamps: false }
);

export default Blacklist;