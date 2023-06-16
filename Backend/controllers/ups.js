const { Ups } = require('../models/ups');

async function getUps() {
  const ups = await Ups.findAll({
    order: [["id", "DESC"]],
    limit: 4, //! Pendiente definir cantidad
  });
  return ups;
};

module.exports = { getUps };