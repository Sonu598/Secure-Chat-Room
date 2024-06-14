const Sequelize = require("sequelize");

const sequelize = new Sequelize("Secure_Chat_App", "root", "Rathsonu@598", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
