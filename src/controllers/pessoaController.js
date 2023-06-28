const Pessoa = require('../models/pessoa');
const Usuario = require('../models/usuario');

function cadastrarView(req, res) {
  res.render('cadastro.html');
}

async function cadastrarPessoa_Usuario(req, res) {
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
    senha: req.body.senha,
  };

  

  try {
    const novaPessoa = await Pessoa.create(pessoaData);
    usuarioData.pessoaId = novaPessoa.id;
    const novoUsuario = await Usuario.create(usuarioData);

    res.render('cadastro.html', { novaPessoa, novoUsuario });
  } catch (error) {
    console.log("Erro:", error);
    res.render('cadastro.html', { error: "Falha ao cadastrar usuário!" });
  }
}



function listarView(req, res) {
  Pessoa.findAll().then((pessoas) => {
      res.render('listar.html', { pessoas });
  }).catch((err) => {
      console.log(erro)
      res.render('listar.html', { erro : "erro ao listar" });
  })
}

function listarViewUsuario(req, res) {
  Usuario.findAll().then((usuarios) => {
      res.render('listarUsuario.html', { usuarios });
  }).catch((erro) => {
      console.log(erro)
      res.render("listarUsuario.html", { erro: "erro ao listar" });
  })
}


module.exports = {
  cadastrarView,
  cadastrarPessoa_Usuario,
  listarView,
  listarViewUsuario
};
