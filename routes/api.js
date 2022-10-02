'use strict'
const express = require('express');  // Importamos express
const api = express.Router();   //Hemos importado lo que tiene que ver con el ruteador de express
const { body } = require('express-validator');  // hay que tener instalado express-validator para poder importarlo

var WelcomeController = require('../controllers/welcome');  //Importamos nuestro controlador welcome. Nombre Welcome con mayúscula la primer letra y agregando la palabra Controller después: WelcomeController
var AlumnosController = require('../controllers/alumnos');
var AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

//const { validate } = require('../models/alumnos');


api.get('/', WelcomeController.welcome);  // Utilizamos el controlador importado

api.get('/alumnos', AlumnosController.alumnos);

api.get('/alumno/:n_lista', AlumnosController.alumno);

api.post('/alumno', userProtectUrl, [
    body('n_cuenta').not().isEmpty(),  // Validamos la información
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put('/alumno/:n_lista', [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete('/alumno/:n_lista', AlumnosController.delete_alumno);

api.post('/login', [
    body('mail').not().isEmpty(), 
    body('pass').not().isEmpty()
], AuthController.login);

// Agregar la ejecución del middleware userProtectUrl para que haga la decodificación
api.post('/logout', userProtectUrl, AuthController.logout);

// api.get('/alumnos', WelcomeController.alumnos);
// api.get('/alumno', WelcomeController.alumno);
// api.post('/alumno', WelcomeController.crear_alumno);

// api.put('/alumno', (req, res) => {
//     res.send("Actualizamos un alumno");
// });

// api.delete('/alumno', (req, res) => {
//     res.send("Eliminamos un alumno");
// });

module.exports = api;  //exportamos api