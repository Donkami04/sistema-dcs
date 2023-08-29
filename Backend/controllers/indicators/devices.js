const { getDevices } = require("../devices");

const dashboardDevices = async () => {
    try {
  let devices = await getDevices();
  devices = devices.map((device) => device.toJSON());

  const numCamerasUp = devices.filter(
    (device) =>
      device.type.toLowerCase() === "camara" &&
      device.prtg_status.includes("Up")
  );
  const numCamerasDown = devices.filter(
    (device) =>
      device.type.toLowerCase() === "camara" &&
      device.prtg_status.includes("Down")
  );
  const numTotalCameras = devices.filter(
    (device) =>
      device.type.toLowerCase() === "camara"
  );
  const numApUp = devices.filter(
    (device) =>
      device.type.toLowerCase() === "ap" && device.prtg_status.includes("Up")
  );
  const numApDown = devices.filter(
    (device) =>
      device.type.toLowerCase() === "ap" && device.prtg_status.includes("Down")
  );
  const numTotalAp = devices.filter(
    (device) =>
      device.type.toLowerCase() === "ap"
  );
  const numOthersUp = devices.filter(
    (device) =>
      device.type.toLowerCase() !== "camara" &&
      device.type.toLowerCase() !== "ap" &&
      device.prtg_status.includes("Up")
  );
  const numOthersDown = devices.filter(
    (device) =>
      device.type.toLowerCase() !== "camara" &&
      device.type.toLowerCase() !== "ap" &&
      device.prtg_status.includes("Down")
  );
  const numTotalOthers = devices.filter(
    (device) =>
      device.type.toLowerCase() !== "ap" &&
      device.type.toLowerCase() !== "camara"
  );

  const dataDevices = {
    numTotalDevices: devices.length,
    numTotalCameras: numTotalCameras.length,
    numTotalAp: numTotalAp.length,
    numTotalOthers: numTotalOthers.length,
    numCamerasUp: numCamerasUp.length,
    numCamerasDown: numCamerasDown.length,
    numApUp: numApUp.length,
    numApDown: numApDown.length,
    numOthersUp: numOthersUp.length,
    numOthersDown: numOthersDown.length,
  };

  return dataDevices;

  } catch (error){
    console.error(error);
    return error
  }
};

module.exports = { dashboardDevices };
