const jwt=require('jsonwebtoken');
const UserModel=require('../models/users');
const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyUser);
        const user=await UserModel.findOne({_id:verifyUser._id,"tokens:token":token});
        if(!user){ throw new Error('User Not Found')};
        req.token=token;
        req.user=user;
        req.userID=user._id;
        next();
    }
    catch(error)
    {
        res.status(401).send("Unauthorized:No token provided.");  
        console.log(error)         
    }
}
module.exports=auth;
