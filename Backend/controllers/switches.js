const { Switches } = require("../models/switches");

async function getSwitches() {
    const switches = await Switches.findAll({
      order: [["id", "DESC"]],
      limit: 52,
    });
    return switches;
};

module.exports = { getSwitches };
