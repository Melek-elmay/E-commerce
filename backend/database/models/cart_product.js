
module.exports = (sequelize, DataTypes) => {
    const Cart_product = sequelize.define("cart_product", {
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{ timestamps: false });
  
    return Cart;
  };
  
  