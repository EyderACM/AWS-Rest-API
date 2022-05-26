import { Joi } from "celebrate";

const professor = Joi.object({
  nombres: Joi.string().required(),
  apellidos: Joi.string().required(),
  numeroEmpleado: Joi.number().required(),
  horasClase: Joi.number().required(),
});

export default professor;
