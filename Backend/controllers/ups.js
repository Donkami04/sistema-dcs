const { Ups } = require('../models/ups');

async function getUps() {
  const ups = await Ups.findAll({
    order: [["id", "DESC"]],
    limit: 64,
  });
  return ups;
};

module.exports = { getUps };