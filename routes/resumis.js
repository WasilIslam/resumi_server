const router = require("express").Router();
const {getResumi, isTitleFree} = require("../controllers/resumiController");
const asyncMiddleware = require("../middleware/async");
const {authToken} = require("../middleware/auth");
router.get(
  "/resumi/:title",
  asyncMiddleware(async (req, res) => {
    //showing resumi without checking if the user is logged in
    const resumi = await getResumi(req.params.title);
    res.send(resumi);
  })
);
router.get(
  "/isTitleFree/:title",
  asyncMiddleware(async (req, res) => {
    //showing resumi without checking if the user is logged in
    const free = await isTitleFree(req.params.title);
    res.send(free);
  })
);
module.exports = router;
