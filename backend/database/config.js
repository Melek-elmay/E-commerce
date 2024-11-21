require('dotenv').config(); 

module.exports = {
    development_mode : {
        database: process.env.db_name,  
        password: process.env.db_password, 
        dialect: process.env.db_dialect,
        username: process.env.db_userName,
        localhost : process.env.db_host
    }
}


// /db_password = root
// db_name = Ecommerce
// db_dialect = mysql
// db_host = localhost