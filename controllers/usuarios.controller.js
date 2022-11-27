const Usuario = require("../models/usuarios.model");
const Joi = require('joi');
const usuariosModel = require("../models/usuarios.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

let response = {
    msg: "",
    exito: false,
    error: null,
}


exports.create = async function (req, res) {

    const schemaRegister = Joi.object({
        nombre: Joi.string().min(2).max(60).required(),
        apellido: Joi.string().min(2).max(40).required(),
        email: Joi.string().email().required(),
        contrasena: Joi.string().min(8).max(70).required(),
        telefono: Joi.string().min(4).max(15).required(),
        direccion: Joi.string().min(4).max(150).required()
    });


    // Validar datos de registro
    const { error } = schemaRegister.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details })
    }

    // Validar email (existe o no)
    const isEmailExist =  await usuariosModel.findOne({email: req.body.email})

    if (isEmailExist){
        response.error = "Email registrado";
        response.exito = false;
        response.msg = `El correo ${req.body.email} ya existe.`;
        return res.status(400).json(response)
    }

    // Hash a contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.contrasena, salt)
     
    let usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contrasena: password,
        telefono: req.body.telefono,
        direccion: req.body.direccion
    });

    await usuario.save(function(err){
        if(err){
            console.error(err)
            response.exito = false
            response.msg="Error al guardar usuario"
            response.error = err
            res.status(400).json(response)
            return;
        }

        response.exito = true
        response.error = null
        response.msg = "El usuario se guardo correctamente"
    })
}

exports.login = async function (req, res) {
    const schemaLogin = Joi.object({
        email: Joi.string().email().required(),
        contrasena: Joi.string().min(8).max(70).required(),
    });

    const {error} = schemaLogin.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }

    // Verificar existencia
    const user = await usuariosModel.findOne({email: req.body.email})
    if (!user) {
        response.msg = `El usuario ${req.body.email} no existe.`;
        response.error = "Usuario no encontrado.";
        response.exito = false;
        return res.status(400).json(response);
    }

    // Validar contrasena
    const isPassValid = await bcrypt.compare(req.body.contrasena, user.contrasena)
    if (!isPassValid) {
        response.error = "Contraseña invalida";
        return res.status(400).json(response);
    }

    // Crear token
    const token = jwt.sign({email: user.email}, process.env.SECRET_TOKEN)

    res.header('auth-token', token).json({
        error: null, 
        data: {token},
        msg: "Bienvenido"
    })
}

exports.verifyToken = function(req, res, next){
    // Obtenemos el token
    const token = req.header('auth-token')

    // Validamos si hay token
    if (!token) {
        response.error = "Acceso denegado.";
        response.exito = false;
        return res.status(401).json(response);
    }

    try {
        // Verificar token
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);

        req.user = verified
        
        next()
    } catch (error) {
        response.error = "Token no valido, acceso denegado"
        response.exito = false;
        res.status(400).json(response);
    }
};
