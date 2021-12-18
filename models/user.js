const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  password: {type: String, minlength: 0, maxlength: 1000},
  name: {type: String, required: true, minlength: 0, maxlength: 255},
  email: {type: String, required: true, minlength: 0, maxlength: 1024, unique: true},
  container: {
    resumis: [{type: String, required: true, maxlength: 1000}],
  },
  observing: {
    resumis: [{type: String, required: true, maxlength: 1000}],
  },
});

userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({email: this.email}, process.env.jwtKey);
  return token;
};

const User = new mongoose.model("user", userSchema);
module.exports = {
  User,
};
