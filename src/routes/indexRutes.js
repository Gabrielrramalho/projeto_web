const express = require('express');
const routes = express.Router();


const indexController = require('../controllers/indexController');
const autenticacaoController = require('../controllers/autenticacaoController');


routes.get('/',autenticacaoController.verificarAutenticacao,indexController.indexView);

module.exports = routes;