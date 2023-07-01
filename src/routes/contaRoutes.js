const express = require('express');
const routes = express.Router();

const ContaController = require('../controllers/contaController');
const autenticacaoController = require('../controllers/autenticacaoController');

routes.get('/conta/selecionada/:id',autenticacaoController.verificarAutenticacao, ContaController.contaSelecionadaView);

routes.get('/conta/cadastrar',autenticacaoController.verificarAutenticacao, ContaController.criarContaView);
routes.post('/conta/cadastrar',autenticacaoController.verificarAutenticacao, ContaController.criarConta);

routes.get('/conta/listarContasUsuario',autenticacaoController.verificarAutenticacao, ContaController.listarContasViewUsuario);

routes.get('/conta/debito',autenticacaoController.verificarAutenticacao,ContaController.debitoView);
routes.post('/conta/debito',autenticacaoController.verificarAutenticacao,ContaController.debitoContaSelecionada);

module.exports = routes;
