const { Ups } = require("../models/ups");
const { DataUps } = require("../models/data_ups");

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
      return {
        status: 201,
        message: "UPS creada exitosamente.",
        data: newUps,
      };
    }
    return {
      status: 409,
      message: "La UPS ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editOneUps(ip, changes) {
  try {
    const ups = await getOneUps(ip);
    if (ups === null) {
      return {
        status: 404,
        message: "La UPS no existe en la base de datos.",
      };
    }
    await DataUps.update(
      {
        ip: changes.ip,
        ubication: changes.ubication,
      },
      { where: { ip: ip } }
    );
    const upsUpdated = await getOneUps(changes.ip);
    return {
      status: 200,
      message: "UPS modificado exitosamente.",
      data: upsUpdated,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUps(ip) {
  try {
    const ups = await getOneUps(ip);
    if (ups === null) {
      return {
        status: 404,
        message: `UPS con IP ${ip} no existe en la base de datos`,
      };
    }
    await DataUps.destroy({ where: { ip: ip } });
    const checkUpsDeleted = await getOneUps(ip);
    if (checkUpsDeleted === null) {
      return { 
        status: 200, 
        message: `UPS con IP ${ip} eliminada exitosamente` };
    } else {
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getUps, createUps, editOneUps, deleteUps };
