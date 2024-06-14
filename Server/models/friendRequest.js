const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FriendRequest = sequelize.define("FriendRequest", {
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  receiverId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = FriendRequest;
