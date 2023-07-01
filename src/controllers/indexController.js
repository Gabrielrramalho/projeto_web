function indexView(req, res) {
    res.redirect(302, '/conta/listarContasUsuario');
  }
  

module.exports = {
    indexView,
}