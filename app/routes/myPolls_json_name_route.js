module.exports = function(mongo, databases) {
  return function(req, res, next) {
    
      
      mongo.connect(databases.dbURL, function(err, db){
          var col = db.collection('votes');
          var id = +req.params.val;
          col.find({info:{$elemMatch:{"id":+id}}}).toArray(function(err, ress){
              res.jsonp(ress[0].info);
             console.log(ress[0].info);
          });
      });
      
      
      
  }
  next();
}