const { Switches } = require("../models/switches");
const { DataSwitches } = require("../models/data_switches");

async function getSwitches() {
  const numSwitches = await getNumberSwitches();
  const switches = await Switches.findAll({
    order: [["id", "DESC"]],
    limit: numSwitches,
  });
  return switches;
}

async function getNumberSwitches() {
  const listSwitches = await DataSwitches.findAll();
  const numSwitches = listSwitches.length;
  return numSwitches;
}

module.exports = { getSwitches };
