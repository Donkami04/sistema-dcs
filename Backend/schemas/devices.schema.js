const Joi = require("joi");

const createDevicesSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  type_device: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El tipo de dispositivo es requerido",
  }),
  site: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El sitio es requerido",
  }),
  dpto: Joi.string().required().allow("").empty("").max(100).messages({
    "any.required": "El departamento es requerido",
  }),
  red: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(10)
    .valid("IT", "OT")
    .messages({
      "any.required": "La red es requerida",
      "any.only": "El valor de la RED debe ser uno de los siguientes: IT, OT",
    }),
});

const editDevicesSchema = Joi.object({
  ip: Joi.string().ip().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
  }),
  type_device: Joi.string().allow("").empty("").max(100),
  site: Joi.string().max(100),
  dpto: Joi.string().max(100),
  red: Joi.string().max(10).valid("IT", "OT").messages({
    "any.only": "El valor de la RED debe ser uno de los siguientes: IT, OT",
  }),
});

module.exports = { createDevicesSchema, editDevicesSchema };
