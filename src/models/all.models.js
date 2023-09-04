import { DataTypes } from "sequelize";
import dataBase from "../utils/database.js";


// Definiendo una tabla en la base de datos 
const All = dataBase.define('alls', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

export default All;
