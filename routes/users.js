const router = require("express").Router();
const {
  handleGoogleLogin,
  getUserByEmail,
  saveContainerResumi,
  observeResumi,
  getObservingResumis,
  getContainerResumis,
  updateContainerResumi,
  getContainerResumi,
} = require("../controllers/userController");
const asyncMiddleware = require("../middleware/async");
const {authToken} = require("../middleware/auth");
router.get(
  "/",
  authToken,
  asyncMiddleware(async (req, res) => {
    const user = await getUserByEmail(req.email);
    res.send(user);
  })
);
router.post(
  "/googleLogin",
  asyncMiddleware(async (req, res) => {
    const {token} = req.body;
    console.log("req token: ",token);
    const jwt = await handleGoogleLogin(token);
    console.log("jwt: ",jwt);

    res.cookie(process.env.cookieToken, jwt).send("Cookies set!!");
  })
);
router.post(
  "/saveResumi",
  authToken,
  asyncMiddleware(async (req, res) => {
    const user = await saveContainerResumi(req.email, req.body.resumiTitle);
    res.send("saved");
  })
);
router.post(
    "/updateResumi",
    authToken,
    asyncMiddleware(async (req, res) => {
      const resumi = await updateContainerResumi(req.email,req.body.resumiTitle, req.body.resumiData);
      res.send("Resumi Saved!!!");
    })
  );

router.get(
  "/getContainerResumis",
  authToken,
  asyncMiddleware(async (req, res) => {
    const resumis = await getContainerResumis(req.email);
    res.send(resumis);
  })
);
router.get(
  "/getContainerResumi/:title",
  authToken,
  asyncMiddleware(async (req, res) => {
    const resumis = await getContainerResumi(req.email,req.params.title);
    res.send(resumis);
  })
);

router.post(
  "/observeResumi",
  authToken,
  asyncMiddleware(async (req, res) => {
    await observeResumi(req.email, req.body.resumiTitle);
    res.send("Resumi Observing!!!");
  })
);

router.get(
  "/getObservingResumis",
  authToken,
  asyncMiddleware(async (req, res) => {
    const resumis = await getObservingResumis(req.email);
    res.send(resumis);
  })
);

module.exports = router;
