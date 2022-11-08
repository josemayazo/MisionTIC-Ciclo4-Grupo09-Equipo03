const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ProductosSchema = new Schema ({
    nombre:{type: String, required: true, max:60},
    descripcion:{type: String, required: true, max:200},
    precio:{type: Number, required: true},
    foto:{type: String, required: true}
    
});

module.exports = mongoose.model("producto", ProductosSchema);