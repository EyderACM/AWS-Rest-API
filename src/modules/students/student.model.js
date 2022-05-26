import { DataTypes } from "sequelize";
import { sequelize } from "../../config/index";

const student = sequelize.define("Student", {
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
  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  promedio: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  fotoPerfilUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default student;
