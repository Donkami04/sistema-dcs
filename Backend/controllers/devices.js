const { Devices } = require("../models/devices");

async function getDevices() {
    const devices = await Devices.findAll({
      order: [["id", "DESC"]],
      limit: 5,
    });
    return devices;
};

module.exports = { getDevices };