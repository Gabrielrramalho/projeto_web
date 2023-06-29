const express = require('express');
const routes = express.Router();

const ContaController = require('../controllers/contaController');
routes.get('/conta',ContaController.contasView);
routes.get('/conta/cadastrar',ContaController.criarContaView);
routes.post('/conta/cadastrar',ContaController.criarConta);

routes.get('/conta/listar',ContaController.listarContaView);


module.exports = routes;
