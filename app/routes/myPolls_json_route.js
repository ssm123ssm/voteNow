module.exports = function(mongo, databases) {
  return function(req, res, next) {
    
      
      mongo.connect(databases.usersURL, function(err, db){
          var col = db.collection('users');
          col.find({id:req.user.id}).toArray(function(err, ress){
            
              res.jsonp(ress[0].votes);
          });
      });
      
      
      
  }
  next();
}