const express = require("express")
const userRoute = express.Router()
const userControll = require("../controller/userController")

userRoute.post("/create",userControll.createUser)
.post("/log",userControll.logUser)
.put("/:id",userControll.updateUser)
.get("/:id/user",userControll.getbyId)
.get("/allUsers",userControll.getAllUsers)
.delete("/:id/dlt",userControll.deleteUser)
.put('/:id/block', userControll.blockUserById)
.put('/:id/unblock', userControll.unblockUserById);
module.exports = userRoute