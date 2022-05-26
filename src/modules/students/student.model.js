import { DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import config from "../../config";

// TODO - Migrate to own
const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    dialectOptions: {
      ssl: "Amazon RDS",
    },
  }
);

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
