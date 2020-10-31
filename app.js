const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose"); 
var Schema = mongoose.Schema; //constructor para crear schemas

var User = require("./models/user").User; //manda a llamar users.js
var app = express();

app.use("/public",express.static("public")); //permite usar archivos estaticos como imagenes, css, scripts
//se pueden crear varias carpetas segun se necesiten en el proyecto

//dos tipos diferentes de uso del BODY-PARSER
app.use(bodyParser.json()); //para peticiones que tengan el formato applitacion json
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

app.post("/users",function(req,res){
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