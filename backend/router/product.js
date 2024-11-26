
const {getAllProducts, getProductByName, postProduct, deleteProduct} = require('../controller/product')

const express = require('express')
const productRouter = express.Router()

productRouter.get("/prodName/:productName", getProductByName)
productRouter.get("/AllProduct", getAllProducts)
productRouter.post("/postProduct", postProduct)
productRouter.delete("/deleteProduct/:id", deleteProduct)

module.exports = productRouter
