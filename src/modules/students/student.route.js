import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import student from "./student.model";

const route = Router();

let students = [];

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

  route.get("/:id", (req, res) => {
    const logger = Container.get("logger");
    logger.debug(
      "Calling getting single student with the id: %o",
      req.params.id
    );
    try {
      const { id: studentId } = req.params;
      const student = students.find(
        (student) => student.id === parseInt(studentId)
      );
      if (!student)
        return res.status(404).json({ status: "student not found" });
      return res.status(200).json(student);
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
        students.push(student);
        return res.status(201).json({ student });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.put(
    "/:id",
    celebrate({
      body: student,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug("Calling updating student endpoint with body: %o", req.body);
      try {
        const { id: studentId } = req.params;
        const updatedStudent = req.body;
        const student = students.find(
          (student) => student.id === parseInt(studentId)
        );
        if (!student)
          return res.status(404).json({ status: "student not found" });

        students = students.filter(
          (student) => student.id !== parseInt(studentId)
        );
        students.push(updatedStudent);
        return res.status(201).json({ student: updatedStudent });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.delete("/:id", async (req, res, next) => {
    const logger = Container.get("logger");
    logger.debug("Calling Creating student endpoint with body: %o", req.body);
    try {
      const { id: studentId } = req.params;
      const student = students.find(
        (student) => student.id === parseInt(studentId)
      );
      if (!student)
        return res.status(404).json({ status: "student not found" });

      students = students.filter(
        (student) => student.id !== parseInt(studentId)
      );
      return res.status(20).json({ studentId });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.all("/:id", async (req, res, next) => {
    return res.status(405);
  });
  route.all("/", async (req, res, next) => {
    return res.status(405);
  });
};
