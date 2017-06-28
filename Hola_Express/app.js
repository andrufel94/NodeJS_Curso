//importar librerias
var express = require("express");
//app para la ejecución de express
var app = express();

//definir el motor de vistas a usar, JADE
app.set("view engine", "jade");

//función get definida sobre http
app.get("/", function(req, res){
    //render la vista y pasar como parametros JSON
    res.render("index", {nombre : "bienvenido"});
});

//definir un get donde se utilizar un parametro
app.get("/:nombre", function(req, res){
    //render la vista y pasar como parametros JSON
    res.render("index", {nombre : req.params.nombre});
});

//definir un post
app.post("/", function(req, res){
    //render la vista y pasar como parametros JSON
    res.render("form_post");
});

//ejecutar servidor en el puerto 8080
app.listen(8080);