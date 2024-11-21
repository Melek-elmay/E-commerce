const { Sequelize } = require("sequelize");
const config = require("./config");

const dbConfig = config.development_mode;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.localhost,
    dialect: dbConfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected ");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};

db.sequelize = sequelize;
db.Sequilize = Sequelize;

module.exports = db;
