const { StatusClients, StatusSwitches, StatusUps, StatusVpn, StatusMesh, StatusDevices, StatusFirewalls } = require("../models/status_system");

async function date_status_system() {
    const dcs_status = await StatusClients.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const sw_status = await StatusSwitches.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const ups_status = await StatusUps.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const vpn_status = await StatusVpn.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const mesh_status = await StatusMesh.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const devices_status = await StatusDevices.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const firewalls_status = await StatusFirewalls.findAll({
      order: [["id", "DESC"]],
      limit: 1,
    });

    const data = {
      dcs: dcs_status,
      sw: sw_status,
      ups: ups_status,
      vpn: vpn_status,
      mesh: mesh_status,
      devices: devices_status,
      fw: firewalls_status,
    };

    return data;
};

module.exports = {date_status_system};
