const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 4006;
const Router = require("./Routes/userRouter")
const bodyParser = require('body-parser');
const cors = require("cors")

mongoose.connect("mongodb://127.0.0.1:27017/UserManagment")
.then(()=>{
    console.log("db is connected");
})   
.catch((err)=>{
    console.log(err);
})

app.use(cors())
app.use(bodyParser.json());
app.use("/api",Router)

app.listen(PORT,()=>{
    console.log(`port is ruunning om ${PORT}`);
})
