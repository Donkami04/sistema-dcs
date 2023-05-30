const express = require("express");
const router = express.Router();
const { overall } = require("../controllers/indicators/overallKpi");
const { getClients } = require("../controllers/clients");
const { getSwitches } = require('../controllers/switches')
const { getDisponibilidad } = require("../controllers/indicators/disponibilidad");
const { getInfraSolucion } = require("../controllers/indicators/infra_solucion");

const allClients = async () => {
  try {
    const clients = await getClients();
    const allClientsJSON = clients.map((client) => client.toJSON());
    return allClientsJSON;
  } catch (error) {
    next(error);
  };
};

const allSwitches = async () => {
  try {
    const switches = await getSwitches();
    const allSwitchesJSON = switches.map((switch_) => switch_.toJSON());
    return allSwitchesJSON;
  } catch (error) {
    next(error);
  };
};

router.get("/", async (req, res, next) => {
  try {
    const listAllClients = await allClients();
    const listAllSwitches = await allSwitches();

    const overallKpi = overall(listAllClients);
    const disponibilidad = getDisponibilidad(listAllClients);
    const infraSolucion = getInfraSolucion(listAllSwitches);

    const allIndicators = {
      overallKpi: overallKpi,
      disponibilidad: disponibilidad,
      infra_solucion: infraSolucion,
    };
    
    res.json(allIndicators);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
