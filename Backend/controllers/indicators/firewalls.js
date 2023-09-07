const { getFirewalls } = require("../firewalls");


async function dashboardFirewalls() {
  let numFwAlive = 0;
  let numFwDown = 0;
  const firewalls = await getFirewalls();
  firewalls.forEach((firewall) => {
    if (firewall.state === "alive") {
      numFwAlive += 1;
    };
    if (firewall.state.toLowerCase()  === "down") {
      numFwDown += 1;
    };
  });

  data = {
    numFwAlive,
    numFwDown,
    totalFw: firewalls.length,
  };

  return data;
};

module.exports = {dashboardFirewalls};