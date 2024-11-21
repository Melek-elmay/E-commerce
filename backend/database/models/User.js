const { DataTypes } = require("sequelize");
const { sequelize } = require("..");


module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        email : {
            type : DataTypes.STRING,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })
    return User
}