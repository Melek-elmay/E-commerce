module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      adminId: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, { timestamps: false });
    return Product;
  };
  