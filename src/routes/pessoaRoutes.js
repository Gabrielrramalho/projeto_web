const express = require('express');
const router = express.Router();

const pessoaController = require("../controllers/pessoaController");

router.get('/pessoa/cadastro',pessoaController.cadastrarView);
router.post('/pessoa/cadastro',pessoaController.cadastrarPessoa_Usuario);

module.exports = router;