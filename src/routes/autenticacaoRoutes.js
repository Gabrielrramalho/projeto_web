const express = require('express');
const routes = express.Router();

const autenticacaoController = require('../controllers/autenticacaoController');


routes.get('/login',autenticacaoController.loginView);
routes.post('/autenticar', autenticacaoController.autenticar);


module.exports = routes;