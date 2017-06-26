module.exports = function(col) {
  return function(req, res, next) {
    
      
      id = +req.params.val;
      col.find({info:{$elemMatch:{"id":+id}}}, {"_id":0}).sort({id:1}).toArray(function(err, ress){
          
          
          
          var pie = {};
          
          for(var i = 0; i < ress[0].info[3].votes.length; i++){
              pie[ress[0].info[3].votes[i].item] = ress[0].info[3].votes[i].vt;
          }
          
          res.jsonp(pie);
                            
              
            });
  }
  next();
}