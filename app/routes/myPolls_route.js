module.exports = function() {
  return function(req, res, next) {
    
      
      if(req.user){                                
                  res.render('myPolls', {user:req.user});
               }
                else{
                   res.render('myPolls', {user:"none"});
                }
      
      
      
  }
  next();
}