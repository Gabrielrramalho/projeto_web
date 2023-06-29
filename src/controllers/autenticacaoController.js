const Usuario = require('../models/usuario');

function loginView(req, res) {
  usuario = req.session.usuario;
  res.render('login.html', { usuario });
}

async function autenticar(req, res) {
  const usuario = await Usuario.findOne({ where: { email: req.body.email, senha: req.body.senha } });
  if (usuario !== null) {
    req.session.autorizado = true;
    req.session.usuario = usuario;
    res.redirect('/');
  } else {
    res.render('login.html', { erro_autenticacao: "Erro de login" });
  }
}

function verificarAutenticacao(req, res, next) {
  if (req.session && req.session.autorizado === true) {
    console.log('Usuário autorizado');
    next();
  } else {
    console.log('Usuário NÃO autorizado');
    res.redirect('/login');
  }
}

module.exports = {
  loginView,
  autenticar,
  verificarAutenticacao
};
