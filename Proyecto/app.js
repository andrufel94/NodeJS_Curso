//importar librerias
var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

//app para la ejecución de express
var app = express();
var Schema = mongoose.Schema;

//conexion a la DB mongo
mongoose.connect("mongodb://localhost/fotos");

//crear un nuevo schema JSON
var userSchemaJSON = {
    email:String,
    password:String
};
//variable con la estructura del schema definido
var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User", user_schema);

//middlewares built-in default express
app.use("/static",express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//definir el motor de vistas a usar, JADE
app.set("view engine", "jade");

//función get definida sobre http
app.get("/", function(req, res){
    //render la vista y pasar como parametros JSON
    res.render("index");
});

app.get("/login", function(req, res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("login");
    });
});

app.post("/users", function(req, res){
    //obtener datos que llegan por el req utilizando body-parser
    console.log("Email: " + req.body.email);
    console.log("Contraseña: " + req.body.password);
    //crear un objeto user basado JSON
    var user = new User({email: req.body.email, password: req.body.password});
    
    user.save(function(){
        res.send("Guardar datos del usuario");
    });
});

//ejecutar servidor en el puerto 8080
app.listen(8080);