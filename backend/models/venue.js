const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Venue = sequelize.define('Venue', {
  name: DataTypes.STRING,
  capacity: DataTypes.INTEGER
});

module.exports = Venue;