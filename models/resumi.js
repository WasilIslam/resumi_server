const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resumiSchema = new mongoose.Schema({
  ownerEmail: {type: String, required: true, maxlength: 1000},//owner Email
  title:{type:String,required:true,maxlength:1000,unique:true},
  data: {type: String, required: true},
});

const Resumi = new mongoose.model("resumi", resumiSchema);
module.exports = {
  Resumi,
};
