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
  
    sequelize.transaction(async (transaction) => {
        try {
          const novaPessoa = await Pessoa.create(pessoaData, { transaction });
          const novoUsuario = await Usuario.create(usuarioData, { transaction });
      
          res.render("pessoa/cadastro.html", { pessoa: novaPessoa, usuario: novoUsuario });
        } catch (error) {
          console.log("Erro:", error);
          res.render("pessoa/cadastro.html", {});
        }
      });
      
}


module.exports = {
    cadastrarView,
    cadastrarPessoa_Usuario
}
  