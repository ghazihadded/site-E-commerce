const mongoose=require('mongoose')
const crypto = require('crypto')
const jwt = require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    images:{
        type:String,
        
    },
    role:{
        type:String,
        default:"user",
    },
    date:{
        type:Date,
       default:Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.methods.getJwtToken = function () {
    
    return   jwt.sign({ user:{id: this._id }}, process.env.SECRET_TOKEN, {expiresIn: "7h"})
}

userSchema.methods.getResetPasswordToken= function (){
  
    const resetToken= crypto.randomBytes(20).toString('hex').slice(0,4)
       console.log(resetToken)
    this.resetPasswordToken=resetToken
   
   this.resetPasswordExpire= Date.now() + 30 * 60 * 1000
   return resetToken
}

module.exports= mongoose.model("User",userSchema)