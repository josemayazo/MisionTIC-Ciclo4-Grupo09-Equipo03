const Usuario = require("../models/usuarios.model");

let response = {
    msg:"",
    exito: false
}

exports.create = function(req,res){
    let usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: req.body.contrasena,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    })

    usuario.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg="Error al guardar usuario"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El usuario se guardo correctamente"
        res.json(response)
    })
}

