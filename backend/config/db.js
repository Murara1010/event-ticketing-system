const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('event_ticketing_db', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;