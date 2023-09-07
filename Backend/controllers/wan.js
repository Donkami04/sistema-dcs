const { Wan } = require('../models/wan');
const { DataWan } = require('../models/data_wan');

async function getWan() {
  const numWan = await getNumberWan();
  const wan = await Wan.findAll({
    order: [["id", "DESC"]],
    limit: numWan,
  });
  return wan;
};

async function getNumberWan() {
  const listWan = await DataWan.findAll();
  const numWan = listWan.length;
  return numWan;
}

module.exports = { getWan };