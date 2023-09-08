const Joi = require("joi");

const createFirewallSchema = Joi.object({
  ip: Joi.string().ip().required().allow("").empty("").messages({
    "string.ip": "La IP debe tener un formato valido",
    "any.required": "La IP es requerida",
  }),
  name: Joi.string().required().allow("").empty("").max(32).messages({
    "any.required": "El nombre es requerido",
  }),
  num_conn: Joi.number().integer().required().allow("").empty("").messages({
    "any.required": "El número de conexiones es requerido",
    "number.base": "El número de conexiones debe ser un número",
    "number.integer": "El número de conexiones debe ser un número entero",
  }),
  vdom: Joi.string()
    .required()
    .allow("")
    .empty("")
    .max(10)
    .valid("true", "false")
    .messages({
      "any.required": "Debe ingresar el valor de VDOM, true o false",
      "any.only":
        "El valor de VDOM debe ser uno de los siguientes: true, false",
    }),
});

const editFirewallSchema = Joi.object({
  ip: Joi.string().ip().allow("").empty("").messages({
    "any.required": "La IP es requerida",
  }),
  name: Joi.string().max(32),
  num_conn: Joi.number().integer().allow("").empty("").messages({
    "number.base": "El número de conexiones debe ser un número",
    "number.integer": "El número de conexiones debe ser un número entero",
  }),
  vdom: Joi.string()
    .max(10)
    .allow("")
    .empty("")
    .valid("true", "false")
    .messages({
      "any.only":
        "El valor de VDOM debe ser uno de los siguientes: true, false",
    }),
});

module.exports = { createFirewallSchema, editFirewallSchema };
