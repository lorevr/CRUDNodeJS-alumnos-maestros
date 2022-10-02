'use strict'

var controller = {  //Poner nuestro primer método

    welcome: function (req, res) {
        console.log("Get ejecutado en raíz");
        res.send("Mi primer debug");
    }/*,

    // Comentamos todo esto ya que los vamos a utilizar dentro del controlador alumnos
    /*alumnos: function (req, res) {
        res.send("Mi listado de alumnos");
    },
    alumno: function (req, res) {
        let cal1 = 5;
        let cal2 = 5;
        let cal3 = 5;

        let final = (cal1 + cal2 + cal3) / 3;

        console.log(final);
        // res.send("La calificación final es: " + final);

        // return res.status(200).json({  // Enviar respuesta en formato json
        //     status: 200,  // Recomendable mandar status también en el json
        //     cal_final: final
        // });

        if( final < 6 ) {
            return res.status(400).json({  // podemos enviar el status para que sea utilizado como convenga
                status: 400,  
                cal_final: final
            });
        } else {
            return res.status(200).json({ 
                status: 200, 
                cal_final: final
            });
        }

    },
    crear_alumno: (req, res) => {
        let user_info = req.body;
        console.log(user_info);  // Imprime la parte del body, contenido en el request
        //res.send("Creamos un alumno " + user_info.name + " Edad: " + user_info.edad);
        return res.status(200).json({  //nuestra estructura con formato json
            status: 200,
            nombre_de_alumno: user_info.name + " " + user_info.apellido,
            edad: user_info.edad
        })
    }*/
};

module.exports = controller;