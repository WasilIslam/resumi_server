const {Resumi} = require("../models/Resumi");

const saveResumi = async (ownerEmail, title) => {
  const resumi = new Resumi({ownerEmail,title, data: "<h1>Let's edit!</h1>"});
  await resumi.save();
  return title;
};
const isTitleFree=async (title)=>{
    const resumi= await Resumi.findOne({title});
    if(resumi)return false;
    return true;
}

const getResumi = async (title) => {
  const resumi=await Resumi.findOne({title});
  if(resumi)return resumi;
  else throw "$400 resumi not exist"
};
const getResumiIfEmailValid = async(email,title)=>{
  const resumi= await getResumi(title);
  if(resumi.ownerEmail===email)return resumi;
  else throw "$400 User does not have this resumi"
}
const getResumisMetaData = async (resumiTitles) => {
  //returns the title
  const resumis = await Resumi.find({title: {$in: resumiTitles}});
  return resumis.map(({title}) => title);
};

const updateResumiData = async (resumiTitle, resumiData) => {
  const resumi = await getResumi(resumiTitle);
  resumi.data = resumiData;
  return await resumi.save();
};

module.exports = {saveResumi,getResumiIfEmailValid,isTitleFree, getResumi, getResumisMetaData, updateResumiData};
