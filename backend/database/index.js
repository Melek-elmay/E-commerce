const { Sequelize } = require("sequelize");
const config = require("./config");

const dbConfig = config.development_mode;

const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.localhost,
    dialect: dbConfig.dialect,
  }
);

connection
  .authenticate()
  .then(() => {
    console.log("database connected ");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};  // db is here 

db.connection = connection;
db.Sequilize = Sequelize;

db.User = require("./models/User")(connection, Sequelize)
db.Cart = require("./models/Cart")(connection, Sequelize)
db.product = require("./models/product")(connection, Sequelize)


console.log("db USer", typeof(db.User));

db.User.hasMany(db.Cart)
db.Cart.belongsTo(db.User)

db.product.belongsToMany(db.Cart, { through: "cart_product" })
db.Cart.belongsToMany(db.product, { through: "cart_product" })


// connection.sync({force : true})
// .then(()=> { console.log("tables created" )})
// .catch((error)=> {console.log(error)})

module.exports = db;