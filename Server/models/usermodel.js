const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  userId: { type: DataTypes.STRING, unique: true, allowNull: false },
  deviceId: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  availCoins: { type: DataTypes.INTEGER, defaultValue: 0 },
  role: {
    type: DataTypes.ENUM("prime", "non-prime"),
    allowNull: false,
    defaultValue: "non-prime",
  },
  friendsRequest: { type: DataTypes.JSON, defaultValue: [] },
  room: { type: DataTypes.JSON, defaultValue: [] },
  totalRoomJoined: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = User;
