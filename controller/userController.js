const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt"); 

const createUser = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log("hiiii", req.body.password, "hiiii");
  
      const { name, password, email } = req.body;
      const data = await userSchema.create({
        name,
        email,
        password: hashedPassword,
      });
      if (!data) {
        return res.status(404).json({
          status: "fail",
          message: "fill the form ",
        });
      }
      return res.status(201).json({
        status: "success",
        message: "create new user succesfullly",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };

const logUser = async(req,res)=>{
    try {
        const data = await userSchema.findOne({ email: req.body.email });
        console.log(data);
        if(!data){
            return res.status(404).json({
                status:'fail',
                message:"fill the form "
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, data.password)
        console.log(validPassword);
        if (!validPassword) {
          return res.status(400).json("Wrong password");
        }
    
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const updateUser=async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);
        const {name,email} = req.body;
        const data = await userSchema.findByIdAndUpdate(id,{name,email},{new:true})
        if(!data){
            return res.status(404).json({
                status:"fail",
                message:"no data here"
            })
        }
        return res.status(200).json({
            status:"done",
            data:data
        })
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async(req,res)=>{
  try {
    const data = await userSchema.find()
    if(!data){
      return res.status(404).json({
          status:"fail",
          message:"no data here"
      })
  }
   return res.status(200).json({
    status:"done",
    data:data
})

  } catch (error) {
    console.log(error);
  }
}

const getbyId = async(req,res)=>{
    try {
        const userId = req.params.id;
        const data = await userSchema.findById(userId)
        if(!data){
            return res.status(404).json({
                status:"fail",
                message:"no data here"
            })
        }
        return res.status(200).json({
            status:"done",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req,res)=>{
  try {
      const {id}=req.params
      const data =  await userSchema.findByIdAndDelete(id)
      if(!data){
          return res.status(404).json({
              status:"fail",
              message:"fail"
          })
      }
      return res.status(200).json({
        status:"done",
        data
    })
  } catch (error) {
      console.log(error);
  }
}

const blockUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isBlocked = true;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports= {createUser,logUser,updateUser,getbyId,getAllUsers,deleteUser,blockUserById}