import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import student from "./student.model";

const route = Router();

const students = [];

export default (app) => {
  app.use("/alumnos", route);

  route.get("/", (req, res) => {
    const logger = Container.get("logger");
    logger.debug("Calling Getting all students endpoint");
    try {
      return res.json(students).status(200);
    } catch (error) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.post(
    "/",
    celebrate({
      body: student,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug("Calling Creating student endpoint with body: %o", req.body);
      try {
        const student = req.body;
        return res.status(201).json({ student });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );
};
