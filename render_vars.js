//import de las librerias http y fs sistema de archivos
var http = require("http"),
    fs = require("fs");

//Crear un servidor http por el puerto 8080
http.createServer(function(req, res){
    //Leer un archivo local html que retorna una funcion
    fs.readFile("./Views/index.html", function(err,html){
        //Variables
        var html_string = html.toString();
        //Expresion regular que busca {x}
        var variables = html_string.match(/[^\{\}]+(?=\})/g);
        var nombre = "Andres Luque";
        
        for (var i = variables.length - 1; i >= 0; i--){
            var value = eval(variables[i]);
            //remplazar en el html por el valor
            html_string = html_string.replace("{"+variables[i]+"}",value);
        };
        
        //Escribir en el header el tipo de contenido
        res.writeHead(200,{"Content-type":"text/html"});
        //Escribir en el cuerpo del response el archivo leido
        res.write(html_string);
        res.end();
    });
}).listen(8080);