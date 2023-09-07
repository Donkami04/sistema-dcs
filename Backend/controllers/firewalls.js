const { Firewalls } = require("../models/firewalls");
const { DataFirewalls } = require("../models/data_firewalls");

async function getFirewalls() {
  const numFw = await getNumberFw();
  const firewalls = await Firewalls.findAll({
    order: [["id", "DESC"]],
    limit: numFw,
  });
  return firewalls;
}

async function getNumberFw() {
  let numFw = 0;
  const listFw = await DataFirewalls.findAll();
  listFw.forEach((fw) => {
    const num_connections = fw.num_conn;
    numFw += num_connections;
  });
  return numFw;
}

module.exports = { getFirewalls };
