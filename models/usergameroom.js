"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameRoom extends Model {
    static associate(models) {}
  }
  UserGameRoom.init(
    {
      roomCode: DataTypes.STRING,
      gameMasterUserId: DataTypes.INTEGER,
      gameGuestUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGameRoom",
    }
  );
  return UserGameRoom;
};
