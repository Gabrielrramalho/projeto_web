const express = require('express');
const routes = express.Router();

const ContaController = require('../controllers/contaController');
routes.get('/conta/slececionada/:id',ContaController.contaSelecionadaView);
routes.get('/conta/debito/:id',ContaController.debitoView);
routes.get('/conta/cadastrar',ContaController.criarContaView);
routes.post('/conta/cadastrar',ContaController.criarConta);

routes.get('/conta/listar',ContaController.listarContasView);


module.exports = routes;
