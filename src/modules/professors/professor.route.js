import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import professorSchema from "./professor.schema";
import Professor from "./professor.model";

const route = Router();

export default (app) => {
  app.use("/profesores", route);

  route.get("/", async (req, res) => {
    const logger = Container.get("logger");
    logger.debug("Calling Getting all professors endpoint");
    try {
      const professors = await Professor.findAll();

      if (!professors)
        return res.status(404).json({ message: "No professors found" });

      return res.json(professors).status(200);
    } catch (error) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.get("/:id", async (req, res) => {
    const logger = Container.get("logger");
    logger.debug(
      "Calling getting single professor with the id: %o",
      req.params.id
    );
    try {
      const { id: professorId } = req.params;
      const professor = await Professor.findByPk(professorId);
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
      body: professorSchema,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug(
        "Calling Creating professor endpoint with body: %o",
        req.body
      );
      try {
        const professor = req.body;

        await Professor.create(professor);

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
      body: professorSchema,
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

        await Professor.update(updatedProfessor, {
          where: { id: professorId },
        });

        return res.status(200).json({ professor: updatedProfessor });
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
      const professor = await Professor.destroy({ where: { id: professorId } });

      if (!professor) {
        return res.status(404).json({ message: "Professor not found" });
      }

      return res.status(200).json({ professor });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.delete("/", async (req, res, next) => {
    return res.status(405).json({});
  });
};
