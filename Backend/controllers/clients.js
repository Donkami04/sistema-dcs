const { CSP, CSS, CNP, CNS, HSE, CNPB, CNSB } = require("../models/clients");

async function getClients() {
    const csp = await CSP.findAll({
      order: [["id", "DESC"]],
      limit: 38,
    });

    const css = await CSS.findAll({
      order: [["id", "DESC"]],
      limit: 38,
    });

    const cnp = await CNP.findAll({
      order: [["id", "DESC"]],
      limit: 44,
    });

    const cns = await CNS.findAll({
      order: [["id", "DESC"]],
      limit: 44,
    });

    const hse = await HSE.findAll({
      order: [["id", "DESC"]],
      limit: 44,
    });

    const cnpb = await CNPB.findAll({
      order: [["id", "DESC"]],
      limit: 39,
    });

    const cnsb = await CNSB.findAll({
      order: [["id", "DESC"]],
      limit: 39,
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

module.exports = { getClients };