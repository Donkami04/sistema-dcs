const { CSP, CSS, CNP, CNS, HSE, CNPB, CNSB } = require("../models/clients");
const { DataClient } = require("../models/data_clients");

async function getClients() {
  const clientCounts = await getNumberClients();

  const csp = await CSP.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCsp,
  });

  const css = await CSS.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCss,
  });

  const cnp = await CNP.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnp,
  });

  const cns = await CNS.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCns,
  });

  const hse = await HSE.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numHse,
  });

  const cnpb = await CNPB.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnpb,
  });

  const cnsb = await CNSB.findAll({
    order: [["id", "DESC"]],
    limit: clientCounts.numCnsb,
  });

  const allClients = [];
  allClients.push(...csp);
  allClients.push(...css);
  allClients.push(...cnp);
  allClients.push(...cns);
  allClients.push(...hse);
  allClients.push(...cnpb);
  allClients.push(...cnsb);

  return allClients;
};

async function getNumberClients() {
  const clientCounts = {
    numCsp: 0,
    numCss: 0,
    numCnp: 0,
    numCns: 0,
    numHse: 0,
    numCnpb: 0,
    numCnsb: 0,
  };

  const listClients = await DataClient.findAll();

  listClients.forEach((client) => {
    if (client.group === "CSP") {
      clientCounts.numCsp++;
    } else if (client.group === "CSS") {
      clientCounts.numCss++;
    } else if (client.group === "CNP") {
      clientCounts.numCnp++;
    } else if (client.group === "CNS") {
      clientCounts.numCns++;
    } else if (client.group === "HSE") {
      clientCounts.numHse++;
    } else if (client.group === "CNPB") {
      clientCounts.numCnpb++;
    } else if (client.group === "CNSB") {
      clientCounts.numCnsb++;
    }
  });

  return clientCounts;
};

module.exports = { getClients };
