
module.exports = (sequelize, DataTypes) => {
    const Cart_product = sequelize.define("cart_products", {
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{ timestamps: false });
  
    return Cart_product;
  };
  
  