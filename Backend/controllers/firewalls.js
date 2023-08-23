const { Firewalls } = require('../models/firewalls');

async function getFirewalls() {
  const firewalls = await Firewalls.findAll({
    order: [["id", "DESC"]],
    limit: 19,
  });
  return firewalls;
};

module.exports = { getFirewalls };