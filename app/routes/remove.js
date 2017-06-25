module.exports = function(mongo, databases) {
  return function(req, res, next) {
    
      var id = +req.params.val;
      
      //verifying from users
      mongo.connect(databases.usersURL, function(err, db){
          var col = db.collection('users');
          col.find({id: req.user.id}).toArray(function(err, ress){
              console.log(ress[0].votes);
              var auth = 0;
              ress[0].votes.forEach(function(item){
                  if(item == id){
                      auth = 1;
                  }
              });
              if(auth){
                  
                  //Remove entry from usersdb
                  var arr = ress[0].votes;
                  var ret = [];
                  
                  arr.forEach(function(item){
                      if(item != id){
                          ret.push(item);
                      }
                  });
                  var newEntry = ress[0];
                  newEntry.votes = ret;
                  
                  col.update({id:req.user.id}, newEntry);
                  
                  //Remove entry from req.user
                  //NO NEED
                  
                  //Remove entry from main db
                  
                  mongo.connect(databases.dbURL, function(err, db){
                      var col = db.collection('votes');
                      col.remove({info:{$elemMatch:{"id":+id}}} ,function(err, ress){
                          
                      })
                  });
                  
                  res.jsonp("ok");
                  /*res.send("OK");*/
              }
              else{
                  res.render('alert2', {user:req.user});
              }
          });
      });
      
  }
  next();
}