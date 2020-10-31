const express = require("express");
const bodyParser = require("body-parser");

var User = require("./models/user").User; //manda a llamar users.js
var app = express();

app.use("/public",express.static("public")); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "pug");

app.get("/",function(req,res){
    res.render("index");
}); 

app.get("/login",function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    });    
});

app.post('/users',function(req,res){
    var user = new User({email: req.body.email, 
                        password: req.body.password,
                        password_confirmation: req.body.password_confirmation
    });
    
    user.save(function(){
        res.send("Datos Guardados");
    });

    console.log(user.password_confirmation);
});

app.listen(8080);