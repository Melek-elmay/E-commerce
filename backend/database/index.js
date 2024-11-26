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

const db = {};  // db is here 

db.connection = sequelize;
db.Sequilize = Sequelize;

db.User = require("./models/User")(sequelize, Sequelize)
db.Cart = require("./models/Cart")(sequelize, Sequelize)
db.Product = require("./models/product")(sequelize, Sequelize)
db.Cart_product = require("./models/cart_product")(sequelize, Sequelize)

db.User.hasMany(db.Cart)
db.Cart.belongsTo(db.User)

db.Product.belongsToMany(db.Cart, { through: "Cart_product" })
db.Cart.belongsToMany(db.Product, { through: "Cart_product" })


// sequelize.sync({force : true})
// .then(()=> { console.log("tables created" )})
// .catch((error)=> {console.log(error)})

module.exports = db;