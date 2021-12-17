const router = require("express").Router();
const asyncMiddleware = require("../middleware/async");
const {authToken} = require("../middleware/auth");
router.get(
  "/",
  asyncMiddleware(async (req, res) => {
      res.send("Hello I am an user!!")
  })
);
module.exports=router;