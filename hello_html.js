//import de las librerias http y fs sistema de archivos
var http = require("http"),
    fs = require("fs");

//Crear un servidor http por el puerto 8080
http.createServer(function(req, res){
    //Leer un archivo local html que retorna una funcion
    fs.readFile("./Views/index.html", function(err,html){
        //Escribir en el header el tipo de contenido
        res.writeHead(200,{"Content-type":"application/json"});
        //Escribir un JASON
        res.write(JSON.stringify({nombre: "Andres", username : "andrufel94"}));
        //Escribir en el header el tipo de contenido
        //res.writeHead(200,{"Content-type":"text/html"});
        //Escribir en el cuerpo del response el archivo leido
        //res.write(html);
        res.end();
    });
}).listen(8080);