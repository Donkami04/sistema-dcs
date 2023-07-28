const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataDevices= sequelize.define(
  "DataDevices",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    eqmt: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "data_devices",
    timestamps: false,
  }
);
