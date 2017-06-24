module.exports = function(col) {
  return function(req, res, next) {
    
      
      id = +req.params.val - 1;
      col.find({}, {"_id":0}).sort({id:1}).toArray(function(err, ress){
          
          
          
          var pie = {};
          
          for(var i = 0; i < ress[id].info[3].votes.length; i++){
              pie[ress[id].info[3].votes[i].item] = ress[id].info[3].votes[i].vt;
          }
          
          res.jsonp(pie);
                            
              
            });
  }
  next();
}