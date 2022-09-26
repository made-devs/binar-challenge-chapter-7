"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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
