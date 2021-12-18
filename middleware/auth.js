require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");


module.exports.encrypt = async (password) => {
  const salt = await bcrypt.genSalt(5);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

module.exports.authToken = function (req, res, next) {
  //authenticates the x-auth-token, returns respective id
  const token = req.cookies[process.env.cookieToken];
  console.log("Token: ", token);
  if (!token) throw "$400 Access denied! Token not found.";
  try {
    const decoded = jwt.verify(token, process.env.jwtKey);
    req.email = decoded.email;
    next();
  } catch (err) {
    throw "$400 Invalid token";
  }
};
