const express = require ("express");
const router = express.Router();
const productosController = require("../controllers/productos.controllers");

router.post("/", productosController.create)
module.exports = router