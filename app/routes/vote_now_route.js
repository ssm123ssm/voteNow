module.exports = function(col) {
  return function(req, res, next) {
    var idd = req.params.val;
        var id2 = req.params.vall;    
        var voted = false;
      
      if(!req.session.votes){
          req.session.votes = [0];
      }
        
            for(var i = 0; i < req.session.votes.length; i++){
                if(req.session.votes[i] == idd){
                    voted = true;
                }
            }
      
      if(!voted){
                req.session.votes.push(idd);
                col.find({info:{$elemMatch:{"id":+idd}}}).toArray(function(err, ress){
            ress[0].info[3].votes[id2].vt++;
           
            var _id = ress[0]["_id"];
            
            col.update({_id:_id},ress[0]);
            res.redirect('back');
        }); 
            }
      
      else{
            if(req.user){
                
                res.render('alert', {user: req.user});
            }
            else{
                res.render('alert', {user:'none'});
            }
        }
      
  }
  next();
}




        
           
              
            
        