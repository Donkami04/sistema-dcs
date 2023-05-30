const express = require("express");
const clientsRoutes = require("./clients.routes");
const switchesRoutes = require("./switches.routes");
const statusRoutes = require("./status_system.routes");
const indicatorsRoutes = require("./indicators.routes");
const router = express.Router();

const allRoutes = (app) => {
  app.use("/api/v1/candelaria", router);
  router.use("/clients", clientsRoutes);
  router.use("/switches", switchesRoutes);
  router.use("/status", statusRoutes);
  router.use("/indicators", indicatorsRoutes);
};

module.exports = { allRoutes };
