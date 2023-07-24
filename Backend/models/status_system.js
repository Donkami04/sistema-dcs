const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const columns = {
  ultima_consulta: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
};

const StatusClients = sequelize.define("StatusClients", columns, {
  tableName: "fechas_consultas_clientes",
  timestamps: false,
});

const StatusSwitches = sequelize.define("StatusSwitches", columns, {
  tableName: "fechas_consultas_switches",
  timestamps: false,
});

const StatusUps = sequelize.define("StatusUps", columns, {
  tableName: "fechas_consultas_ups",
  timestamps: false,
});

const StatusVpn = sequelize.define("StatusVpn", columns, {
  tableName: "fechas_consultas_vpn",
  timestamps: false,
});

const StatusMesh = sequelize.define("StatusMesh", columns, {
  tableName: "fechas_consultas_mesh",
  timestamps: false,
});

const StatusDevices = sequelize.define("StatusDevices", columns, {
  tableName: "fechas_consultas_devices",
  timestamps: false,
});

module.exports = { StatusClients, StatusSwitches, StatusUps, StatusVpn, StatusMesh, StatusDevices };
