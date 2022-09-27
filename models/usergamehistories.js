"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistories extends Model {
    static associate(models) {}
  }
  UserGameHistories.init(
    {
      UserGameRoomId: DataTypes.INTEGER,
      playerOneUserId: DataTypes.INTEGER,
      playerOnePick: DataTypes.STRING,
      playerOneStatus: DataTypes.STRING,
      playerTwoUserId: DataTypes.INTEGER,
      playerTwoPick: DataTypes.STRING,
      playerTwoStatus: DataTypes.STRING,
      winnerUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGameHistories",
    }
  );
  return UserGameHistories;
};
