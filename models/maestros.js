'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var maestrosSchema = Schema({
    id_maestro: { type: Number, require: true, unique:true },
    nombre: { type: String, require: true },
    telefono: { type: String, require: true },
    email: { type: String, require: true }
});

module.exports = mongoose.model('maestros', maestrosSchema);