module.exports = function(col) {
  return function(req, res, next) {
      
      
      var max;
      col.find({},{_id:1}).toArray(function(err, ress){
          max = ress.length;
          console.log("Max is " + max);
          id = +req.params.val;
      if(id > max){
          /*if(req.user){
              res.render('404', {user:req.user});
              res.end();
          }
          else{
              res.render('404', {user:'none'});
              res.end();
          }
          res.send("404");*/
          res.redirect('/404');
      }
      else{
          
          col.find({info:{$elemMatch:{"id":+id}}}).toArray(function(err, ress){
          
          if(err){
              res.send("Unable to find");
          }
          
          else{
              var pie = {};
          console.log(ress[0]);
          for(var i = 0; i < ress[0].info[3].votes.length; i++){
              pie[ress[0].info[3].votes[i].item] = ress[0].info[3].votes[i].vt;
          }
          
                            
               if(req.user){                                
                  res.render('vote', {ret:ress[0], user:req.user});
               }
                else{
                   res.render('vote', {ret:ress[0], user:"none"});
                }
          }
          
            });
      }
      });
    
      
     
      
  }
  next();
}