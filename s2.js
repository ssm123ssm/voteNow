//Packages
var express = require('express');
var mongo = require('mongodb').MongoClient;
var ejs = require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//Configurations
var databases = require('./app/config/databases');
var pass_config = require('./app/auth/passport');

//Routes
var main_router = require('./app/routes/main_route');
var votes_router = require('./app/routes/votes_route');
var vote_now_router = require('./app/routes/vote_now_route');
var create_router = require('./app/routes/create_route');
var logout_router = require('./app/routes/logout_route');
var submit_router = require('./app/routes/submit_route');
var pie_router = require('./app/routes/pie_route');
var myPolls_router = require('./app/routes/myPolls_route');
var myPolls_json_router = require('./app/routes/myPolls_json_route');
var myPolls_json_name_router = require('./app/routes/myPolls_json_name_route');

var remover = require('./app/routes/remove');



var app = express();

//Middleware configs
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('app/views/res'));

app.set('views', __dirname +'/app/views');
app.set('view engine', 'ejs');

//Passport setup
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});
passport.use(new FacebookStrategy({
    clientID: pass_config.facebook.clientID,
    clientSecret: pass_config.facebook.clientSecret,
    callbackURL: pass_config.facebook.callbackURL,
    profileFields: pass_config.facebook.profileFields
  },
  function(accessToken, refreshToken, profile, done) {          
            var pid = profile.id;
    
            //Users database
            mongo.connect(databases.usersURL, function(err, db){
                if(err){
                    console.log("Cant connect");
                }
                var col = db.collection('users');
                col.find({id:pid}).toArray(function(err, ress){
                    if(ress.length == 0){
                        console.log("No User");
                        var user = {
                            id : profile.id,
                            name : profile.displayName,
                            email : 'email',
                            votes:[]
                        };
                        col.insert(user);
                        console.log("inserted This");
                        console.log(user);
                        
                        done(null, user);
                    }
                    else{
                        console.log("Exists");
                        console.log(ress[0]);
                        done(null, ress[0]);
                    }
                });
            });
  }
));
app.get('/login', passport.authenticate('facebook'));
app.get('/auth/callback',passport.authenticate('facebook', { scope: 'email', successRedirect: '/',failureRedirect: '/login' }));

//Main database
mongo.connect(databases.dbURL, function(err, db){
    if(err){
        console.log(err);
    }
    var col = db.collection('votes');
    
    //Getting views through routers
    app.get('/',main_router(col)); 
    app.get('/votes/:val', votes_router(col));
    app.get('/votes/:val/pie', pie_router(col));
    app.get('/votes/:val/:vall',vote_now_router(col));    
    app.get('/create',create_router());
    app.get('/logout', logout_router());
    app.post('/submit', submit_router(col, mongo, databases));  
    app.get('/myPolls', myPolls_router());
    app.get('/myPolls_json', myPolls_json_router(mongo, databases));
    app.get('/myPolls_json/:val', myPolls_json_name_router(mongo, databases));
    app.get('/remove/:val', remover(mongo, databases));
    app.get('/404', function(req, res){
        if(req.user){
              res.render('404', {user:req.user});
          }
          else{
              res.render('404', {user:'none'});
          }
    });
});
 
//Listening
app.listen(process.env.PORT || 80);
