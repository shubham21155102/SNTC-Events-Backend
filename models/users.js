const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
UserSchema.methods.generateAuthToken=async function(){
    try{
        const token= jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
        // console.log(token);
    }catch(error)
    {
        console.log(error);
    }
}

UserSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});
module.exports = mongoose.model('user',UserSchema);
