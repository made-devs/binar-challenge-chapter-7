"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usergamebiodata extends Model {
    static associate(models) {}
  }
  usergamebiodata.init(
    {
      usergameId: DataTypes.INTEGER,
      dob: DataTypes.DATE,
      pob: DataTypes.STRING,
      city: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
    },
    {
      sequelize,
      modelName: "usergamebiodata",
    }
  );
  return usergamebiodata;
};
