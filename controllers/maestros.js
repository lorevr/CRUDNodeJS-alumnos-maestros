'use strict'

const { validationResult } = require('express-validator');

var Maestros = require('../models/maestros');

var controller = {
    maestros: function( req, res ) {
        Maestros.find({}).exec((err, maestros) => {
            if(err) return res.status(500).json({ status: 500, message: err });
            if(!maestros) return req.status(200).json({ status: 200, message: "No hay maestros en la lista" });
            return res.status(200).json({
                status: 200,
                data: maestros
            });
        });
    },
    buscar_maestro: function(req, res) {
        let id_maestro = req.params.id_maestro;
        Maestros.findOne({ id_maestro: id_maestro }).exec((err, maestro) => {
            if(err) return res.status(500).json({ status: 500, message: err });
            if(!maestro) return res.status(200).json({ status: 200, message: "No se encontró el maestro"});
            return res.status(200).json({
                status: 200,
                data: maestro
            });
        });
    },
    crear_maestro: function(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user_info = req.body;

        Maestros.findOne({ id_maestro: user_info.id_maestro }).exec((err, maestro) => {
            if(err) return res.status(500).json({ status: 500, message: err });
            if(maestro) return res.status(200).json({ status: 200, message: "El Id del maestro ya existe"});

            let maestros_model = new Maestros();

            maestros_model.id_maestro = user_info.id_maestro;
            maestros_model.nombre = user_info.nombre;
            maestros_model.telefono = user_info.telefono;
            maestros_model.email = user_info.email;

            maestros_model.save((err, maestroStored) => {
                if(err) return res.status(500).json({ status: 500, message: err });
                if(!maestroStored) return res.status(200).json({ status: 200, message: "No se almacenó la información del maestro" });
            });

            return res.status(200).json({
                status: 200,
                message: "Datos del maestro fueron almacenados."
            });
        });
    },
    update_maestro: function(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id_maestro = req.params.id_maestro;
        let user_info = req.body;

        let maestro_info_update = {
            nombre: user_info.nombre,
            telefono: user_info.telefono,
            email: user_info.email
        }

        Maestros.findOneAndUpdate({ id_maestro: id_maestro }, maestro_info_update, { new: true }, (err, maestroUpdate) => {
            if(err) return res.status(500).json({ message: "Error al actualizar" });
            if(!maestroUpdate) return res.status(404).json({ message: "El maestro no existe" });
            return res.status(200).json({
                nombre: maestroUpdate.nombre,
                telefono: maestroUpdate.telefono,
                email: maestroUpdate.email
            });
        });
    },
    delete_maestro: function(req, res) {
        let id_maestro = req.params.id_maestro;

        Maestros.findOneAndDelete({ id_maestro: id_maestro }, (err, maestroDelete) => {
            if(err) return res.status(500).json({ message: "Error al eliminar." });
            if(!maestroDelete) return res.status(404).json({ message: "No existe el maestro."});
            return res.status(200).json({
                message: "Maestro eliminado."
            });
        });
    }
};

module.exports = controller;