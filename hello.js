//import de las librerias para hacer peticiones http
var http = require("http");
//Funcion que contendra la logica del servidor
var manejador = function(solicitud, respuesta){
    console.log("Nueva peticion");
    respuesta.end("Hola mundo");
};
//Metodo para crear un servidor http
var servidor = http.createServer(manejador);
//Metodo para poner en linea el servidor escuchando
//por el puerto 8080
servidor.listen(8080);