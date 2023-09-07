const { Devices } = require("../models/devices");
const { DataDevices } = require("../models/data_devices");

async function getDevices() {
  const numDevices = await getNumberDevices();
  const devices = await Devices.findAll({
    order: [["id", "DESC"]],
    limit: numDevices,
  });
  return devices;
};

async function getNumberDevices() {
  const listDevices = await DataDevices.findAll();
  const numDevices = listDevices.length;
  return numDevices;
};

module.exports = { getDevices };
