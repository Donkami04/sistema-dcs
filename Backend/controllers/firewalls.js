const { Firewalls } = require("../models/firewalls");
const { DataFirewalls } = require("../models/data_firewalls");

async function getFirewalls() {
  const numFw = await getNumberFw();
  const firewalls = await Firewalls.findAll({
    order: [["id", "DESC"]],
    limit: numFw,
  });
  return firewalls;
}

async function getNumberFw() {
  let numFw = 0;
  const listFw = await DataFirewalls.findAll();
  listFw.forEach((fw) => {
    const num_connections = fw.num_conn;
    numFw += num_connections;
  });
  return numFw;
}

async function createFirewall(data) {
  try {
    const firewallDoesExist = await DataFirewalls.findOne({
      where: { ip: data.ip },
    });
    if (firewallDoesExist === null) {
      const newFirewall = await DataFirewalls.create({
        ip: data.ip,
        name: data.name,
        num_conn: data.num_conn,
        vdom: data.vdom,
      });
      return {
        status: 201,
        message: "El Firewall ha sido creado exitosamente.",
        data: newFirewall,
      };
    }
    return {
      status: 409,
      message: "El Firewall ya existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function editOneFirewall(id, changes) {
  try {
    const firewall = await DataFirewalls.findByPk(id);
    if (firewall !== null) {
      await DataFirewalls.update(
        {
          ip: changes.ip,
          name: changes.name,
          num_conn: changes.num_conn,
          vdom: changes.vdom,
        },
        { where: { id: id } }
      );
      const firewallUpdated = await DataFirewalls.findByPk(id);
      return {
        status: 200,
        message: "El Firewall ha sido modificado exitosamente.",
        data: firewallUpdated,
      };
    }
    return {
      status: 404,
      message: "El Firewall no existe en la base de datos.",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteFirewall(id) {
  try {
    const firewall = await DataFirewalls.findByPk(id);
    if (firewall !== null) {
      await DataFirewalls.destroy({ where: { id: id } });
      const checkFirewallIsDeleted = await DataFirewalls.findByPk(id);
      if (checkFirewallIsDeleted === null) {
        return {
          status: 200,
          message: "El Firewall ha sido eliminado exitosamente",
        };
      } else {
        throw error;
      }
    }
    return {
      status: 404,
      message: "El Firewall no existe en la base de datos",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getFirewalls, createFirewall, editOneFirewall, deleteFirewall };
