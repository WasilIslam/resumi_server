function dollarErrEmitter(err, req, res, next) {
  //err got has the following format ($xxx message) where xxx is the status and message as it is
  //example $400 Error the admin is not present
  let status=500;
  if(err[0]==="$"){
    status=Number(err.slice(1,4));
    err=err.slice(5,err.length);
  }
  console.log(err,status);
  res.status(status).send(err);
};
module.exports={dollarErrEmitter}