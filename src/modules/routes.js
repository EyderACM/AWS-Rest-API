import { Router } from "express";
import student from "./students/student.route";
import professor from "./professors/professor.route";

export default () => {
  const app = Router();
  student(app);
  professor(app);

  return app;
};
