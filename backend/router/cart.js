const postProduct = require("../controller/cart")

const express = require('express')
const cartrouter = express.Router()


cartrouter.post("/productInCart/:id", postProduct)

module.exports = cartrouter