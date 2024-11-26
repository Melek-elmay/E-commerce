const {postProduct, getProduct} = require("../controller/cart")

const express = require('express')
const cartrouter = express.Router()


cartrouter.post("/productInCart", postProduct)
cartrouter.get("/product/:id", getProduct)

module.exports = cartrouter