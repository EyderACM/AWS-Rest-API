import { Joi } from "celebrate";

const student = Joi.object({
  id: Joi.number().required(),
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  matricula: Joi.string().required(),
  promedio: Joi.number().required(),
});

export default student;
