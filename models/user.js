const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  id: {type: String, required: true, minlength: 0, maxlength: 100, unique: true},
  password:{type:String,required:true,minlength:0,maxlength:1000},
  name: {type: String, required: true, minlength: 0, maxlength: 255},
});

userSchema.methods.isPasswordValid = async function(password) {
  return await bcrypt.compare( password,this.password);
};

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.jwtKey);
  return token;
};


const user= new mongoose.model("user",userSchema);
module.exports={
    user
}