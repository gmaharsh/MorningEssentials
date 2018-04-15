var express = require('express');
var app = express();
var bp = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Local = require('passport-local');
var User = require('./models/user');
var bodyParser = require('body-parser')
mongoose.connect("mongodb://maharsh:maharsh@ds111638.mlab.com:11638/morningessentials");

var port = process.env.PORT || 2718;

//Passport Configs

app.use(require("express-session")({
	secret:"Morning Essentials",
	resave:false,
	saveUninitialized:false
}));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
passport.use(new Local(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bp.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/todos",isLoggedIn,function(req,res){
	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
			throw(err);
		}
		else{
			res.json({"todoList":foundUser.todoList});
		}
	})
});

app.post("/todos",isLoggedIn,function(req,res){
	User.findOne({username:req.user.username},function(err,foundUser){
		if(err){
			console.log(err);
			throw(err);
		}
		else{
			foundUser.todoList = req.body.todoList;
			foundUser.save(function (err, updatedUser) {
			   if (err) return handleError(err);
			});
		}
	})
})

app.get("/user",isLoggedIn,function(req,res,err){
	res.sendFile(__dirname + '/public/morning.html');
});
//================================================================================================================================================================
//                                                                   Authentication
//================================================================================================================================================================

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var gender = req.body.gender;
	var city = req.body.city;
	var username = req.body.username;
	var  newUser = new User({fname:req.body.fname,lname:req.body.lname,gender:req.body.gender,city:req.body.city,username:username});
	// var newUser = new User({username:req.body.fname});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/");
			});
		}
	});
// res.send("We have received a post request");
});


//================================================================================================================================================================================================
//                                                                                      LOGIN
//================================================================================================================================================================================================

app.get("/",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",{
	successRedirect:"/user",
	failureRedirect:"/"
}),function(req,res){
});


//================================================================================================================================================================
//                                                                                     LogOut
//================================================================================================================================================================
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

app.get("*",function(req,res){
	res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}
//=================================================================================================================================================================================================
//                                                                                  Server Listening
//=================================================================================================================================================================================================

app.listen(port,function(req,res){
	console.log("Server is Running on port:",port);
});