const { Ups } = require("../models/ups");
const { DataUps } = require("../models/data_ups");
const { errorHandler, handleSuccess } = require("../middlewares/error.handler");

async function getUps() {
  const numUps = await getNumberUps();
  const ups = await Ups.findAll({
    order: [["id", "DESC"]],
    limit: numUps,
  });
  return ups;
}

async function getNumberUps() {
  const listUps = await DataUps.findAll();
  const numUps = listUps.length;
  return numUps;
}

async function getOneUps(ip) {
  const ups = await DataUps.findOne({ where: { ip: ip } });
  return ups;
}

async function createUps(data) {
  try {
    const upsDoesExist = await getOneUps(data.ip);
    if (upsDoesExist === null) {
      const newUps = await DataUps.create({
        ip: data.ip,
        ubication: data.ubication,
      });
      return newUps;
    } else {
      throw new Error("El elemento ya existe en la base de datos.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editOneUps(ip, changes) {
  try {
    const ups = getOneUps(ip);
    if(ups === null){
      throw new Error("El elemento no existe en la base de datos.");
    }
    await DataUps.update(
      {
        ip: changes.ip,
        ubication: changes.ubication,
      },
      { where: { ip: ip } }
    );
    const upsUpdated = getOneUps(ip);
    return upsUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getUps, createUps, editOneUps };
