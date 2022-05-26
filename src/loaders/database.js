import { Sequelize } from "sequelize";
import config from "../config";
import Student from "../modules/students/student.model";
import Professor from "../modules/professors/professor.model";

export const sequelize = new Sequelize(
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

export default () => {
  try {
    sequelize.authenticate();
    Student.sync({ force: true });
    Professor.sync({ force: true });
  } catch (error) {
    throw new Error("Something happened setting up the db");
  }
};
