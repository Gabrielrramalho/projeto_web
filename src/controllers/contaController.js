const Conta = require('../models/conta');

function contasView(req,res){
    res.render('contas.html')
}

function criarContaView(req,res){
    res.render('criarConta.html');
}

async function criarConta(req,res){
    let conta = {
        numero: req.body.numero,
        nome: req.body.nome,
        data_abertura: req.body.data_c,
        saldo: req.body.saldo
    }

    Conta.create(conta).then((result)=>{
        res.render("criarConta.html", {conta});
        console.log(conta);
        console.log(conta.usuarioId);
    }).catch((err) => {
        console.log(err)
        let erro = err
        res.render("criarConta.html", {erro});
    })
}

function listarContaView(req, res) {
    Conta.findAll().then((contas) => {
        res.render('listarContas.html', { contas });
    }).catch((err) => {
        console.log(erro)
        res.render('listarContas.html', { erro : "erro ao listar" });
    })
  }






module.exports = {
    criarContaView,
    criarConta,
    contasView,
    listarContaView
}