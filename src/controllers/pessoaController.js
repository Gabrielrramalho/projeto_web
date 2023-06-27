const Pessoa = require('../models/pessoa');
const Usuario = require('../models/usuario');


function cadastrarView(req,res){
    res.render('pessoa/cadastro.html')
}

function cadastrarPessoa_Usuario(req, res) {
    let pessoaData = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      data_nascimento: req.body.data_nascimento,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      cep: req.body.cep
    };
  
    let usuarioData = {
      email: req.body.email,
      senha: req.body.senha
    };
  

      
}


module.exports = {
    cadastrarView,
    cadastrarPessoa_Usuario
}
  