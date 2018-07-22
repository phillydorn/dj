const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
// const sequelize = new Sequelize('dj', 'phillydorn', 'postgresdj', {
  // host: 'pd-postgresql.ceqq6ogxanih.us-west-2.rds.amazonaws.com',
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const entities = [
  "Song",
];

const db = {}

 entities.forEach(entity => {
  db[entity] = sequelize.import(path.join(__dirname, `${entity}.js`));
 });

 Object.keys(db).forEach(modelName=> {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
 });

 db.sequelize = sequelize;
 db.Sequelize = Sequelize;

module.exports = db;
