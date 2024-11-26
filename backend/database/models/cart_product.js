module.exports = (sequelize, DataTypes) => {
  const Cart_product = sequelize.define("Cart_product", {

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },{ timestamps: false });

  return Cart_product;
};