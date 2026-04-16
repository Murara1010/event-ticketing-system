const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
  price: DataTypes.FLOAT
});

module.exports = Ticket;