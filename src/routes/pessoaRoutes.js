const express = require('express');
const routes = express.Router();

const pessoaController = require("../controllers/pessoaController");

routes.get('/pessoa/listar', pessoaController.listarView);
routes.get('/pessoa/listarUsuarios', pessoaController.listarViewUsuario);

routes.get('/pessoa/cadastro',pessoaController.cadastrarView);
routes.post('/pessoa/cadastro',pessoaController.cadastrarPessoa_Usuario);

module.exports = routes;