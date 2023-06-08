const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Ups= sequelize.define(
  "Ups",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_prtg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    batery: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    switch: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_ups: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    tableName: "ups",
    timestamps: false,
  }
);

module.exports = { Ups }