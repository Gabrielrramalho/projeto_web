const Conta = require('../models/conta');

async function contaSelecionadaView(req, res) {
    contaId = req.params.id;

    Conta.findOne({ where: { id: contaId } }).then((conta) => {
        res.render('conta.html', { conta })
    }).catch((err) => {
        console.log(erro);
        res.render('conta.html', { erro: "Erro ao selecionar conta!!" });
    });

}

function debitoView(req, res) {
    res.render('debito.html',{});
}

function debitoContaSelecionada(req, res) {
    let valor_a_debitar = parseInt(req.body.valor_d);
  
    Conta.findOne({ where: { numero: req.body.conta_dest } })
      .then(conta => {
        let saldo = parseInt(conta.saldo);
        let valor_atualizado = saldo + valor_a_debitar;
  
        return Conta.update({ saldo: valor_atualizado }, {
          where: {
            numero: req.body.conta_dest
          }
        })
        .then(() => {
          return Conta.findOne({ where: { numero: req.body.conta_dest } });
        });
      })
      .then(contaAtualizada => {
        res.redirect(`/conta/selecionada/${contaAtualizada.id}`);
      })
      .catch(error => {
        console.log(error);
        res.render('contas.html', { erro: "Erro ao realizar débito!" });
      });
  }
  
  

function criarContaView(req, res) {
    res.render('criarConta.html');
}

async function criarConta(req, res) {
    const usuarioId = req.session.usuario.id;
    let conta = {
        numero: req.body.numero,
        nome: req.body.nome,
        data_abertura: req.body.data_c,
        saldo: req.body.saldo,
        usuarioId: usuarioId
    }

    Conta.create(conta).then((result) => {
        res.render("criarConta.html", { conta });
        console.log(conta);
        console.log(conta.usuarioId);
    }).catch((err) => {
        console.log(err)
        let erro = err
        res.render("criarConta.html", { erro });
    })
}

function listarContasView(req, res) {
    Conta.findAll().then((contas) => {
        res.render('contas.html', { contas });
    }).catch((err) => {
        console.log(erro)
        res.render('contas.html', { erro: "erro ao listar" });
    })
}
function listarContasViewUsuario(req, res) {
  const usuarioId = req.session.usuario.id;

  Conta.findAll({ where: { usuarioId: usuarioId } })
    .then((contas) => {
      res.render('contas.html', { contas });
    })
    .catch((err) => {
      console.log(err);
      res.render('contas.html', { erro: "Erro ao listar contas" });
    });
}







module.exports = {
    criarContaView,
    criarConta,
    contaSelecionadaView,
    listarContasView,
    debitoView,
    debitoContaSelecionada,
    listarContasViewUsuario
}