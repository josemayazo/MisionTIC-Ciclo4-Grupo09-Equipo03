const Empleado = require("../models/empleados.model");

let response = {
    msg:"",
    exito: false
}

exports.create = function(req,res){
    let empleado = new Empleado({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    })

    empleado.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg="Error al guardar empleado"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El empleado se guardo correctamente"
        res.json(response)
    })
}