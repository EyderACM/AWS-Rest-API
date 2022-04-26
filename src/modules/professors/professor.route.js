import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import professor from "./professor.model";

const route = Router();

let professors = [];

export default (app) => {
  app.use("/profesores", route);

  route.get("/", (req, res) => {
    const logger = Container.get("logger");
    logger.debug("Calling Getting all professors endpoint");
    try {
      return res.json(professors).status(200);
    } catch (error) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.get("/:id", (req, res) => {
    const logger = Container.get("logger");
    logger.debug(
      "Calling getting single professor with the id: %o",
      req.params.id
    );
    try {
      const { id: professorId } = req.params;
      const professor = professors.find(
        (professor) => professor.id === parseInt(professorId)
      );
      if (!professor)
        return res.status(404).json({ status: "professor not found" });
      return res.status(200).json(professor);
    } catch (error) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.post(
    "/",
    celebrate({
      body: professor,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug(
        "Calling Creating professor endpoint with body: %o",
        req.body
      );
      try {
        const professor = req.body;
        professors.push(professor);
        return res.status(201).json({ professor });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.put(
    "/:id",
    celebrate({
      body: professor,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug(
        "Calling updating professor endpoint with body: %o",
        req.body
      );
      try {
        const { id: professorId } = req.params;
        const updatedProfessor = req.body;
        const professor = professors.find(
          (professor) => professor.id === parseInt(professorId)
        );
        if (!professor)
          return res.status(404).json({ status: "professor not found" });

        professors = professors.filter(
          (professor) => professor.id !== parseInt(professorId)
        );
        professors.push(updatedProfessor);
        return res.status(201).json({ professor: updatedProfessor });
      } catch (e) {
        logger.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.delete("/:id", async (req, res, next) => {
    const logger = Container.get("logger");
    logger.debug("Calling Creating professor endpoint with body: %o", req.body);
    try {
      const { id: professorId } = req.params;
      const professor = professors.find(
        (professor) => professor.id === parseInt(professorId)
      );
      if (!professor)
        return res.status(404).json({ status: "professor not found" });

      professors = professors.filter(
        (professor) => professor.id !== parseInt(professorId)
      );
      return res.status(200).json({ professorId });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.delete("/alumnos", async (req, res, next) => {
    return res.status(405);
  });

  route.delete("/", async (req, res, next) => {
    return res.status(405);
  });
};
