var express  = require('express');
var router = express.Router();


module.exports = function(col) {
  return function(req, res, next) {
     // console.log(vote_res);
    // Implement the middleware function based on the options object
      if(!req.session.votes){
            req.session.votes = [0];
        }
            
            
            col.find({}, {"_id":0}).sort({id:1}).toArray(function(err, ress){
               vote_res = ress;
                
               if(req.user){
                                 
                   console.log("Logged in");
                   console.log(req.user.id);
                   res.render('index',{res:ress, user:req.user});
                   res.end();
               }
                else{
                    console.log("Not Logged in");
                    res.render('index',{res:ress, user:"none"});
                    res.end();
                }
            });
    
  }
  next();
}