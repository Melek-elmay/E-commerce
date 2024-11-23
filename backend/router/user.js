
const {signup, login, findAllUsers, deleteUser, updateUser, getUserImage} = require('../controller/user')

const express = require('express')
const userrouter = express.Router()


userrouter.post("/signup", signup)
userrouter.get("/allusers", findAllUsers)
userrouter.get("/image/:id", getUserImage)
userrouter.delete("/deleteUser/:id", deleteUser)
userrouter.put("updateUser/:id", updateUser)
userrouter.post("/login", login)

module.exports = userrouter
