const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const {dollarErrEmitter} = require("./middleware/errorHandlers");

const users = require("./routes/users");
const resumis = require("./routes/resumis");

module.exports = function (app) {
  app.use(
    cors({
      credentials: true,
      origin: [process.env.CORS_API],
    })
  );
  app.use(methodOverride());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.json());
  app.use("/users", users);
  app.use("/resumis", resumis);
  app.use(dollarErrEmitter);
};
