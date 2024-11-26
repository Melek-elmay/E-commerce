
const {signup, login, findOneUSer, deleteUser, updateUser, getUserImage} = require('../controller/user')

const express = require('express')
const userrouter = express.Router()


userrouter.post("/signup", signup)
userrouter.get("/getOneUser/:id", findOneUSer)
userrouter.get("/image/:id", getUserImage)
userrouter.delete("/deleteUser/:id", deleteUser)
userrouter.put("updateUser/:id", updateUser)
userrouter.post("/login", login)

module.exports = userrouter
