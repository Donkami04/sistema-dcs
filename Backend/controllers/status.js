const { StatusClients, StatusSwitches } = require("../models/status_system");

async function date_status_system() {
    const dcs_status = await StatusClients.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const sw_status = await StatusSwitches.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const data = {
      dcs: dcs_status,
      sw: sw_status,
    };

    return data;
};

module.exports = {date_status_system};
