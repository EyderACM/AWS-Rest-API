import { Sequelize } from "sequelize";
import config from "../config";

export const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.port,
    dialect: "mysql",
    dialectOptions: {
      ssl: "Amazon RDS",
    },
  }
);

export default () => {
  try {
    sequelize.authenticate();
    return;
  } catch (error) {
    throw new Error("Something happened setting up the db");
  }
};
