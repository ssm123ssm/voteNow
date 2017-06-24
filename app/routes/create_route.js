module.exports = function() {
  return function(req, res, next) {
    
      
      if(req.user){      
        res.render('createVote', {user:req.user});
    }
      else{
          res.render('noAuth');
      }
  }
  next();
}