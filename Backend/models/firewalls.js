const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Firewalls = sequelize.define(
  "Firewalls",
  {
    fw: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    canal: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    packet_loss: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    latency: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    jitter: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    failed_before: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    datetime: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gateway: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    ubication: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    status_gateway: {
      type: DataTypes.STRING(32),
      allowNull: true,
    }
  },
  {
    tableName: "firewalls",
    timestamps: false,
  }
);

module.exports = {Firewalls};