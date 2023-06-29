const Usuario = require('../models/usuario');

function loginView(req, res){
    res.render('login.html', {});
}

async function autenticar(req, res) {
    const usuario = await Usuario.findOne({ where: { email: req.body.email, senha: req.body.senha} });
    if (usuario!== null) {    
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/')
    } else {
        res.render('login.html', {erro_autenticacao: "erro"})
    }
}

function sair(req, res) {
    req.session.destroy(function(err) {
        console.log('Usuário desautorizado')
     })
     res.render('login.html', {sucesso_saida: "erro"})
}

function verificarAutenticacao(req, res, next) {
  if (req.session && req.session.autorizado) {
      console.log('Usuário autorizado');
      next();
  } else {
      console.log('Usuário NÃO autorizado');
      res.redirect('/login');
  }
}


module.exports =  {
    loginView,
    autenticar,
    verificarAutenticacao,
    sair
};