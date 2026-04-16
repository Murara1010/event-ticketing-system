const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  name: DataTypes.STRING
});

module.exports = Event;