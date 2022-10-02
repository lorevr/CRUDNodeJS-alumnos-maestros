'use strict'  // Obliga a trabajar en el modo más estricto de JavaScript 
//importamos mongoose, un conector intuitivo, fácil de configurar, práctico y ligero
const mongoose = require('mongoose'); 
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://user:pass@localhost:27017/curso',...
mongoose.connect('mongodb://localhost:27017/curso', { useNewUrlParser: true, useUnifiedTopology: true}) 
        .then(() => {
            console.log('Conexión a la base de datos es establecida con éxito');

            //Crear el servidor
            var server = app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: http://localhost:" + port);
            });
        })
        .catch(err => console.log(err));

