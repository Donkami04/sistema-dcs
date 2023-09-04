const { Wan } = require('../models/wan');

async function getWan() {
  const wan = await Wan.findAll({
    order: [["id", "DESC"]],
    limit: 13,
  });
  return wan;
};

module.exports = { getWan };