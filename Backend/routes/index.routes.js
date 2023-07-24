const express = require("express");
const clientsRoutes = require("./clients.routes");
const switchesRoutes = require("./switches.routes");
const statusRoutes = require("./status_system.routes");
const indicatorsRoutes = require("./indicators.routes");
const upsRoutes = require("./ups.routes");
const vpnRoutes = require("./vpn.routes");
const meshRoutes = require("./mesh.routes");
const devicesRoutes = require("./devices.routes");
const router = express.Router();

const allRoutes = (app) => {
  app.use("/api/v1/candelaria", router);
  router.use("/clients", clientsRoutes);
  router.use("/switches", switchesRoutes);
  router.use("/status", statusRoutes);
  router.use("/indicators", indicatorsRoutes);
  router.use("/ups", upsRoutes);
  router.use("/vpn", vpnRoutes);
  router.use("/mesh", meshRoutes);
  router.use("/devices", devicesRoutes);
};

module.exports = { allRoutes };
