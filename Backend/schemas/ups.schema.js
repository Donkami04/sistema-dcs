const Joi = require("joi");

const createUpsSchema = Joi.object({
  ip: Joi.string().ip().allow('').empty('').required().messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  ubication: Joi.string().required().allow('').empty('').max(100).messages({
    "string.max": "La ubicación de la UPS no puede exceder 100 caracteres",
    "any.required": "La ubicación de la UPS es requerida",
  }),
});

const editUpsSchema = Joi.object({
  ip: Joi.string().ip().allow('').empty('').messages({
    "string.ip": "La IP debe tener un formato valido"
  }),
  ubication: Joi.string().max(100).allow('').empty('').messages({
    "string.max": "La ubicación de la UPS no puede exceder 100 caracteres"
  }),
});

module.exports = { createUpsSchema, editUpsSchema };
