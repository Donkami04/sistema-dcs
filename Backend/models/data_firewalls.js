const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataFirewalls = sequelize.define(
  "DataFirewalls",
  {
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    num_conn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "data_firewalls",
    timestamps: false,
  }
);

module.exports = {DataFirewalls};