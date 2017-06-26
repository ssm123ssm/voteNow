module.exports = function(col) {
  return function(req, res, next) {
      
      
      var max;
      col.find({},{_id:0}).toArray(function(err, ress){
          max = ress.length;
          console.log("Max is " + max);
          id = +req.params.val;
          var auth = 0;
          
          ress.forEach(function(item){
              if(item.info[0].id == id){
                  auth = 1;
              }
              
          });
          
      if(!auth){       
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