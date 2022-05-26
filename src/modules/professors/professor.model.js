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
