const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const PedidosSchema = new Schema ({
    tipoSolicitud:{type: String, required: true, max:150},
    cantidad:{type: Number, required: true},
    fechaSolicitud:{type: Date, required: true},
    estadoEntrega:{type: String, required: true, max:150}

    
});

module.exports = mongoose.model("pedido", PedidosSchema);