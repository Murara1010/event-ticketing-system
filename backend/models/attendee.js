const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attendee = sequelize.define('Attendee', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = Attendee;