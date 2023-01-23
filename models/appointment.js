const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Appointment = sequelize.define("appointments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: Sequelize.BIGINT,
    allowNull: false,
    unique: true,
  },
});

module.exports = Appointment;
