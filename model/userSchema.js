const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
      required: true,
    },
    isBlocked: { type: Boolean, default: false },
})


module.exports=mongoose.model("User",userSchema);