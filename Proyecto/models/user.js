//Importar mongoose mapeador de objetos
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conexion a la DB mongo
mongoose.connect("mongodb://localhost/fotos");

//variables CONST
var email_match = [/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/, "El email no es valido"];
var password_confirmation = {
    validator: function(p){
        return this.password_confirmation == p;
    },
    message: "Las contraseñas no son iguales"
}

//Schema de mongo
var user_schema = new Schema({
    name: String,
    username: String,
    password: {type: String,
              validate: password_confirmation},
    age: {type: Number, min: [3,"La edad es muy pequeña"], max: [99,"La edad es muy grande"]},
    email: {type: String, required: "El correo es obligatorio", match:email_match},
    date_of_birth: Date
});

user_schema.virtual("password_confirmation").get(function(){
    return this.p_c;
}).set(function(password){
    this.p_c = password;
});

var user_model = mongoose.model("User", user_schema);

module.exports.user_model = user_model;