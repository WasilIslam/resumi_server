const {User} = require("../models/user");
const {getPayload} = require("../utils/googleAuth");
const {getResumisMetaData, saveResumi, updateResumiData, getResumiIfEmailValid} = require("./resumiController");

const getUserByEmail = async (email) => {
        const user = await User.findOne({email});
        if(!user)throw "$400 Email Not Found!"
        return user;
};

const getObservingResumis = async (email) => {
  const user = await getUserByEmail(email);
  const resumis = await getResumisMetaData(user.observing.resumis);
  return resumis;
};

const getContainerResumis = async (email) => {
  const user = await getUserByEmail(email);
  const resumis = await getResumisMetaData(user.container.resumis);
  return resumis;
};

const observeResumi = async (email, resumiTitle) => {
  const user = await getUserByEmail(email);
  user.observing.resumis.push(resumiTitle);
  return await user.save();
};
const getContainerResumi = async(email,resumiTitle)=>{
  return await getResumiIfEmailValid(email,resumiTitle);
}
const saveContainerResumi = async (email, resumiTitle) => {
  const user = await getUserByEmail(email);
  const newResumiId = await saveResumi(email, resumiTitle);
  user.container.resumis.push(newResumiId);
  return await user.save();
};
const updateContainerResumi = async (email,resumiTitle, resumiData) => {
  console.log(resumiTitle,resumiData);
    if(await getResumiIfEmailValid(email,resumiTitle)){
      const resumi=await updateResumiData(resumiTitle, resumiData);
      return resumi;
    }
  };
  

const handleGoogleLogin = async (token) => {
  //gets email, checks if in database(login) else create new id login
  const {name, email} = await getPayload(token);
  const oldUser = await User.findOne({email});
  if (oldUser) {
    return oldUser.genAuthToken();
  } else {
    console.log("New User");
    let newUser = new User({name, email});
    newUser = await newUser.save();
    return newUser.genAuthToken();
  }
};

module.exports = {handleGoogleLogin,getContainerResumi, updateContainerResumi, getUserByEmail, saveContainerResumi, observeResumi, getContainerResumis, getObservingResumis};
