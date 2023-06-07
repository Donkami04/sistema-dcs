const sequelize = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataUps= sequelize.define(
  "DataUps",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    tableName: "data_ups",
    timestamps: false,
  }
);
