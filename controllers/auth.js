'use strict'
const jwt = require('jsonwebtoken'); // importamos el módulo de jwt
const { validationResult } = require('express-validator'); // también importamos express-validator

var Usuarios = require('../models/usuarios');
var Sessions = require('../models/sessions');

var controller = {
    login: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let login_info = req.body;  

        Usuarios.findOne({ mail: login_info.mail, pass: login_info.pass }).exec((err, usuario) => {
            if (err) return res.status(500).json({ status: 500, mensaje: err });
            if (!usuario) return res.status(200).json({ status: 200, mensaje: "Los datos no son válidos." });

            const payload = {
                user_id: usuario.id
            };

            // parámetros (payload, una llave(recomendable la más larga de 256) )
            const access_token = jwt.sign(payload, 'ZwIV7oUIIgjjEqxA629vh5I1y7FU9vssZmDIWYcApacL8hJuWE', {
                expiresIn: '1d'  // 1 día
            });

            let update = {
                user_id: usuario.id,
                jwt: access_token
            };

            // parámetros ( la búsqueda, objeto update que creamos, objetos: upsert y new(si existe actualizarlo, si no existe insertarlo), y una función de callback para manejar los errores y la respuesta del update )
            Sessions.findOneAndUpdate({user_id: usuario.id}, update, {upsert: true, new: true}, (err, sessionsUpdate) => {
                if(err) return res.status(500).send({message: err});

                if(!sessionsUpdate) return res.status(404).send({message: "Datos erroneos."});

                return res.status(200).json({
                    status: 200,
                    message: "Autenticación correcta.",
                    token: access_token
                });

            });

        });
    },
    logout: function (req, res) {
        
        console.log(req.decoded);
        Sessions.findOneAndRemove({user_id: req.decoded.user_id}, (err, sessionDeleted) => {
            if(err) return res.status(500).send({message: err});
            if(!sessionDeleted) return res.status(404).send({message: "Datos erroneos."});

            return res.status(200).send({
                message: "Usuario salió correctamente."
            });
        });

    }
    
};

module.exports = controller;