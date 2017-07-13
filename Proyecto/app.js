//importar librerias
var express = require("express");
var bodyparser = require("body-parser");
var user_model = require("./models/user").user_model;

//app para la ejecución de express
var app = express();

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
    user_model.find(function(err,doc){
        console.log(doc);
        res.render("login");
    });
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.post("/users", function(req, res){
    //obtener datos que llegan por el req utilizando body-parser
    console.log("Email: " + req.body.email);
    console.log("Contraseña: " + req.body.password);
    //crear un objeto user basado JSON
    var user = new user_model({email: req.body.email,
                               password: req.body.password,
                               password_confirmation: req.body.password_confirmation
                              });
    /*function-callback:
    * err: lista de errores
    * user: objeto que se esta guardando
    * num_rows: numero de registros que se afectan
    */
//    user.save(function(err, user, num_rows){
//        if(err)
//            console.log(String(err));
//        res.send("Guardar datos del usuario");
//    });
    
    //Promesas - promises
    user.save().then(function(user){
        res.send("Guardar datos del usuario");
    }, function(err){
        if(err)
            res.send("Sucedio un error al guardar: "+String(err));
    });
});

app.post("/sessions", function(req, res){    
    user_model.findOne({
        email: req.body.email,
        password: req.body.password
    },function(err, docs){
        console.log(docs);
        res.send("Usuario inicio sesión");
    });
});

//ejecutar servidor en el puerto 8080
app.listen(8080);