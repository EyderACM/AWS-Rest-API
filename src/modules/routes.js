import { Router } from "express";
import student from "./students/student.route";

export default () => {
  const app = Router();
  student(app);

  return app;
};
