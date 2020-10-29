var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/users").User;
var app = express();

app.use("/public",express.static('public')); //permite usar archivos estaticos como imagenes, css, scripts
//se pueden crear varias carpetas segun se necesiten en el proyecto

//dos tipos diferentes de uso del BODY-PARSER
app.use(bodyParser.json); //para peticiones que tengan el formato applitacion json
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "pug");

app.get("/", function(req,res){
    res.render("index");
}); 

app.get("/login",function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    })    
});

app.post("/users", function(req,res){
    var user = new User({email: req.body.email, 
        password: req.body.password,
        password_confirmation: req.body.password_confirmation});

        console.log(user.password_confirmation);

    //guardar los datos del usuario
    user.save(function(){
        res.send("Datos Guardados");
    });
    
});

app.listen(8080);