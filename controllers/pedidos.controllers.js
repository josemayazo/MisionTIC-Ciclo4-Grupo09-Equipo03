const Pedido = require("../models/pedidos.model");

let response = {
    msg:"",
    exito: false
}

exports.create = function(req,res){
    let pedido = new Pedido({
        tipoSolicitud: req.body.tipoSolicitud,
        cantidad: req.body.cantidad,
        fechaSolicitud: req.body.fechaSolicitud,
        estadoEntrega: req.body.estadoEntrega
        
    })

    pedido.save(function(err){
        if(err){
            console.error(err),
            response.exito = false,
            response.msg="Error al guardar pedido"
            res.json(response)
            return;
        }

        response.exito = true,
        response.msg = "El pedido se guardo correctamente"
        res.json(response)
    })
}

