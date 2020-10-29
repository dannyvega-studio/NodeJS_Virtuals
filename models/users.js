var mongoose = require("mongoose"); 
var Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/test", 
{
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}).then(db => console.log("La Conexion se ha realizado Correctamente!!"))
.catch(err => console.log("error:", err))

var user_schema = new Schema({
    name: String,
    username: String,
    password: String,
    age: Number,
    email: String,
    date_of_birth: Date
});

user_schema.virtual("password_confirmation").get(function(){
    return this.pass_confirmation;
}).set(function(password){
    this.pass_confirmation = password;
});

user_schema.virtual("full_name").get(function(){
    return this.name + this.last_name;
}).set(function(full_name){
    var words = full_name.split(" ");
    this.name = words[0];
    this.last_name = words[1];
})

var User = mongoose.model("User",user_schema);

module.exports.User = User;