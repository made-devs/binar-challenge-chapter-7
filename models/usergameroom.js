'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserGameRoom.init({
    roomCode: DataTypes.STRING,
    gameMasterUserId: DataTypes.INTEGER,
    gameGuestUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGameRoom',
  });
  return UserGameRoom;
};