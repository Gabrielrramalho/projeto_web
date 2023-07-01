const express = require('express');
const routes = express.Router();

const movimentoController = require('../controllers/movimentoController');
const autenticacaoController = require('../controllers/autenticacaoController');

routes.get('/conta/movimento/:id',autenticacaoController.verificarAutenticacao,movimentoController.realizarMovimentoView);
routes.post('/conta/movimento/:id',autenticacaoController.verificarAutenticacao,movimentoController.realizarMovimento);

routes.get('/conta/listar/movimentos/:id', movimentoController.listarMovimentosUsuario);

module.exports = routes;
