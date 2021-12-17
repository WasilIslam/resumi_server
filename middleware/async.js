//the async middle ware function to handle the errors
module.exports= function asyncMiddleware(handler){
    return async function(req,res,next){
        try{
            await handler(req,res);
        }
        catch(ex){
            next(ex);
        }
    }
}