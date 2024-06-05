const express = require("express")
const userRoute = express.Router()
const userControll = require("../controller/userController")

userRoute.post("/create",userControll.createUser)
.post("/log",userControll.logUser)
.put("/:id",userControll.updateUser)
.get("/:id",userControll.getbyId)


module.exports = userRoute