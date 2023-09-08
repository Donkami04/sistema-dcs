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

async function createUps(data) {
  try {
    const upsDoesExist = await DataUps.findOne({ where: { ip: data.ip } });
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

async function editOneUps(id, changes) {
  try {
    const ups = await DataUps.findByPk(id);
    if (ups !== null) {
      await DataUps.update(
        {
          ip: changes.ip,
          ubication: changes.ubication,
        },
        { where: { id: id } }
      );
      const upsUpdated = await DataUps.findByPk(id);
      return {
        status: 200,
        message: "UPS modificado exitosamente.",
        data: upsUpdated,
      };
    }
    return {
      status: 404,
      message: "La UPS no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUps(id) {
  try {
    const ups = await DataUps.findByPk(id);
    if (ups !== null) {
      await DataUps.destroy({ where: { id: id } });

      const checkUpsIsDeleted = await DataUps.findByPk(id);
      if (checkUpsIsDeleted === null) {
        return {
          status: 200,
          message: "UPS eliminada exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "UPS no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getUps, createUps, editOneUps, deleteUps };
