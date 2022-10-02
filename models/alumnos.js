'use strict'
var mongoose = require('mongoose'); //importamos mongoose
var Schema = mongoose.Schema; //utilizamos una función de mongoose, Schema

//creamos nuestro esquema, modelo
// Tener cuidado al momento de armar nuestro modelo, debe contener los datos que vamos a requerir
var AlumnosSchema = Schema({
    // n_cuenta: Number,
    n_cuenta: { type: Number, require: true, unique: true }, //n_cuenta de tipo numérico, requerido y único
    nombre: { type: String, require: true },  //Nombre tipo string y obligatorio
    edad: { type: Number, require: true },  // hacemos que todos nuestros campos sean requeridos
    genero: { type: String, require: true },
    // edad: Number,
    // genero: String
});

//exportamos el modelo como alumnos y los valores de nuestro esquema(AlumnosSchema)
module.exports = mongoose.model('alumnos', AlumnosSchema);