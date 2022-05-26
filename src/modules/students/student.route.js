import { Router } from "express";
import { celebrate } from "celebrate";
import { Container } from "typedi";
import studentSchema from "./student.schema";
import Student from "./student.model";
import { MulterError } from "multer";
import { upload } from "./student.utils";
import config from "../../config";

const route = Router();
const profilePicUrl = (id, file) =>
  `https://${config.aws.bucket}.s3.amazonaws.com/fotos/${id}_fotoPerfil_${file.originalname}`;

export default (app) => {
  app.use("/alumnos", route);

  route.get("/", async (req, res) => {
    const logger = Container.get("logger");
    logger.debug("Calling Getting all students endpoint");
    try {
      const students = await Student.findAll();

      if (!students)
        return res.json({ message: "no students found" }).status(404);

      return res.json(students).status(200);
    } catch (error) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.get("/:id", async (req, res) => {
    const logger = Container.get("logger");
    logger.debug(
      "Calling getting single student with the id: %o",
      req.params.id
    );
    try {
      const { id: studentId } = req.params;
      const student = await Student.findByPk(studentId);

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
      body: studentSchema,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug("Calling Creating student endpoint with body: %o", req.body);
      try {
        const student = req.body;

        await Student.create(student);

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
      body: studentSchema,
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug("Calling updating student endpoint with body: %o", req.body);
      try {
        const { id: studentId } = req.params;
        const updatedStudent = req.body;

        await Student.update(updatedStudent, { where: { id: studentId } });

        return res.status(200).json({ student: updatedStudent });
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
      const student = await Student.destroy({ where: { id: studentId } });

      if (!student)
        return res.status(404).json({ status: "student not found" });

      return res.status(200).json({ studentId });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.post("/:id/fotoPerfil", async (req, res, next) => {
    const logger = Container.get("logger");
    logger.debug("Calling photo upload with body: %o", req.body);
    try {
      const { id: studentId } = req.params;
      await upload.single("foto")(req, res, async (err) => {
        if (err instanceof MulterError)
          return res.json({ message: "something went wrong", err }).status(400);
        if (err) return res.json({ message: err.message }).status(404);

        const file = req.file;

        await Student.update(
          { fotoPerfilUrl: profilePicUrl(studentId, file) },
          { where: studentId }
        );

        const student = await Student.findByPk(studentId);

        return res.json(student).status(200);
      });
    } catch (e) {
      logger.error("🔥 error: %o", e);
      return next(e);
    }
  });

  route.delete("/", async (req, res, next) => {
    return res.status(405).json({});
  });
};
