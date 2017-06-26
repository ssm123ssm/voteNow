/*var mongo = require('mongodb').MongoClient;
var databases = require('./app/config/databases');*/

module.exports = function(col, mongo, databases) {
  return function(req, res, next) {
    col.find().toArray(function(err, ress){
        
        var max = 0; 
            
        col.find().toArray(function(err, ress){
           
            
            for(var i =0; i <ress.length; i++){
                if(+ress[i].info[0].id >= max){
                    max = +ress[i].info[0].id;
                }
            }
            console.log("Max is " + max);
            var idt = max + 1;
            var ar = [];
        for(var i = 0; i < req.body.option.length; i++){
            ar.push({"item":req.body.option[i], "vt":0});
        }
         
            var ret = {"info":
                      [{"id":idt},
                      {"name":req.body.name},
                      {"num_options": req.body.option.length},
                      {"votes":ar}]};
            
            col.insert(ret);
            res.writeHead(302, {'Location': '/'});
            res.end();
            
        });
        mongo.connect(databases.usersURL, function(err, db){
          var coll = db.collection('users');
          coll.find({id:req.user.id}).toArray(function(err, ress){
            col.find().toArray(function(err, res){  
              var idt = max+1;
              ress[0].votes.push(idt);
               
                req.user.votes.push(idt);
                 console.log(req.user.votes);
              coll.update({id:req.user.id}, ress[0]);             
             }); 
              
              
              
          });
      });
        
        });
      
      
      
  }
  next();
}