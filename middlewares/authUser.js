'user strict'  
//middleware para validar el token
const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');

const middlewares = {
    userProtectUrl: function(req, res, next) {
        const token = req.headers['access-token'];

        if( token ) {
            jwt.verify(token, 'ZwIV7oUIIgjjEqxA629vh5I1y7FU9vssZmDIWYcApacL8hJuWE', (err, decoded) => {
                if(err) {
                    return res.status(403).json({message: "Token inválida."});
                } else {
                    req.decoded = decoded;

                    // Para que acepte solamente el último login generado
                    //busca en la tabla al usuario con el id y que sea igual al token guardado en la tabla de sesiones
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, session) => {
                        if(err) return res.status(500).send({message: "Error al devolver los datos."});
                        if(!session) return res.status(404).send({message: "Los datos de autenticación no son válidos."});
                        
                        next(); // para que continúe
                    });
                }
            })
        } else {
            res.status(403).send({
                message: "Token no válida."
            });
        }
    }
};

module.exports = middlewares;
