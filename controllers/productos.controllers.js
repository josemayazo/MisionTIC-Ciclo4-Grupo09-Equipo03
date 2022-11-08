const Producto = require("../models/productos.model");

let response = {
    msg:"",
    exito: false
}

exports.create = function(req,res){
    let producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        foto: req.body.foto
        
    })

    producto.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg="Error al guardar producto"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El producto se guardo correctamente"
        res.json(response)
    })
}


