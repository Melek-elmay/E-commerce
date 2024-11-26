const db = require("../database/index");



const getProductByName  = async (req, res) => {
    try {
        const { productName } = req.params
        const result = await db.Product.findAll({
            where: { productName},
        });
        res.send(result);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).send("Failed to fetch lessons");
    }
  };


const getAllProducts = async (req, res) => {
    try {
        const result = await db.Product.findAll();
        res.send(result);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).send("Failed to fetch lessons");
    }
  };

const postProduct = async (req, res) => {
    try {

        const { productName, price, description, stock, category } = req.body
        const result = await db.Product.create({
            productName,
            price,
            description,
            stock,
            category, 
        });
        
        res.status(201).send(result);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Failed to create product");
    }
};

const deleteProduct = async function (req, res) {
    try {
        const { id } = req.params; 
        const result = await db.Product.destroy({
            where: {
                id: id,
            },
        });
     res.status(200).json(result);
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};





  module.exports = {getAllProducts, getProductByName, postProduct, deleteProduct}