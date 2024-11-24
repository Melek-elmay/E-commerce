
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('users', {
        userName: {
            type: DataTypes.STRING, 
            allowNull: true, 
        },
        email: {
            type : DataTypes.STRING,
            allowNull: true,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        }, 
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }
        

    }, { timestamps: false })
    return User
}