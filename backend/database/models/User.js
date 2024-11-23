// const { DataTypes } = require("sequelize");
// const { sequelize } = require("..");


module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('users', {
        userName: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        email: {
            type : DataTypes.STRING,
            allowNull: false,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        }, 
        status: {
            type: DataTypes.STRING,
            defaultValue: "user",
            allowNull: false
        }
        

    }, { timestamps: false })
    return User
}