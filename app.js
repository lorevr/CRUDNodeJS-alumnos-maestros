'use strict'
const express = require('express');
// parse() analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis
const bodyParser = require('body-parser'); // Hacer parseo del body de nuestra aplicación


const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: false
}))

const routes = require('./routes/api');
const routesMaestros = require('./routes/api-maestros');

app.use('', routes);
app.use('', routesMaestros);

// Exportamos
module.exports = app;