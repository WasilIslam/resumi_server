const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const getPayload = async (token) => {
  try {
    console.log("token given:",token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (err) {
    console.error(err);
    throw "$400 Error occured while logging in!";
  }
};
module.exports = {getPayload};
