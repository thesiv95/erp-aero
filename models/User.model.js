import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

  },
  { timestamps: true }
);

export default User;
