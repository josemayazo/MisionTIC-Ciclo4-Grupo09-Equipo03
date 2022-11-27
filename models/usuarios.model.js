const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema ({
    nombre:{type: String, required: true, max:60},
    apellido:{type: String, required: true, max:40},
    email:{type: String, required: true, max:40},
    contrasena:{type: String, required: true, max:70},
    telefono:{type: String, required: true, max:15},
    direccion:{type: String, required: false, max:150}
});

module.exports = mongoose.model("usuario", usuarioSchema);