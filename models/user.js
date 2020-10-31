const mongoose = require("mongoose"); 
var Schema = mongoose.Schema; //constructor para crear schemas

mongoose.connect("mongodb://localhost:27017/test", 
{
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then(db => console.log("La Conexion se ha realizado Correctamente!!"))
.catch(err => console.log("error:", err))

/*var userSchemaJSON = {
    email: String,
    password: String
};

var user_schema = new Schema(userSchemaJSON);*/

var user_schema = new Schema({
    name: String,
    last_name: String,
    username: String,
    password: String,
    age: Number,
    email: String,
    date_of_birth: Date
});

user_schema.virtual("password_confirmation").get(function(){
    return this.passConfirm;
}).set(function(password){
    this.passConfirm = password;
});

var User = mongoose.model("User",user_schema);

module.exports.User = User;