const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organizer = sequelize.define('Organizer', {
  name: DataTypes.STRING
});

module.exports = Organizer;