import { DataTypes } from "sequelize";
import { sequelize } from "../../config/index";

const professor = sequelize.define("Professor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horasClase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default professor;
