'use strict'
const express = require('express');
const api_maestros = express.Router();
const { body } = require('express-validator');

var MaestrosController = require('../controllers/maestros');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;


api_maestros.get('/maestros', userProtectUrl, MaestrosController.maestros);
api_maestros.get('/maestro/:id_maestro', userProtectUrl, MaestrosController.buscar_maestro);
api_maestros.post('/maestro', userProtectUrl, [
    body('id_maestro').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('telefono').not().isEmpty(),
    body('email').not().isEmpty(),
], MaestrosController.crear_maestro);
api_maestros.put('/maestro/:id_maestro', userProtectUrl, [
    body('nombre').not().isEmpty(),
    body('telefono').not().isEmpty(),
    body('email').not().isEmpty()
], MaestrosController.update_maestro);
api_maestros.delete('/maestro/:id_maestro', userProtectUrl, MaestrosController.delete_maestro);



module.exports = api_maestros;