const express = require ("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidos.controllers");

router.post("/", pedidosController.create)
module.exports = router