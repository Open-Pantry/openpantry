const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const credentials = require('../../keys/config');

console.log("Credentials:",credentials.username);

const sequelize = new Sequelize(credentials.database, credentials.username, credentials.password, {
  host: credentials.server,
  dialect: 'postgres',
  omitNull: true,
  port: 5432
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
