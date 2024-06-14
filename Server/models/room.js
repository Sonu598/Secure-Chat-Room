const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define("Room", {
  roomId: { type: DataTypes.STRING, unique: true, allowNull: false },
  users: { type: DataTypes.JSON, defaultValue: [] },
  creator: { type: DataTypes.STRING, allowNull: false },
  chats: { type: DataTypes.JSON, defaultValue: [] },
});

module.exports = Room;
