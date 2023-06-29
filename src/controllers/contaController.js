const Conta = require('../models/conta');

async function contaSelecionadaView(req, res) {
    contaId = req.params.id;

    Conta.findOne({ where:{ id: contaId } }).then((conta)=>{
        res.render('conta.html',{conta})
    }).catch((err)=>{
        console.log(erro);
        res.render('conta.html',{erro : "Erro ao selecionar conta!!"});
    });

}

function debitoView(req,res){
    res.render('deposito.html');
}

async function debitoContaSelecionada(req, res) {
    let valor_debitado = req.body.valor;
    let conta_id= req.params.id;
    let conta = {
        valor: req.params.saldo + valor_debitado
    }
    Conta.update(conta,{
        where: {
            id: req.body.id,
        },
    }).then((conta)=>{
        res.render('/conta/debito/{{conta_id}}',{conta});
    }).catch((err)=>{
        console.log(erro);
        res.render('conta.html',{erro: "Erro ao selecionar conta!!"});
    });
}



function criarContaView(req, res) {
    res.render('criarConta.html');
}

async function criarConta(req, res) {
    let conta = {
        numero: req.body.numero,
        nome: req.body.nome,
        data_abertura: req.body.data_c,
        saldo: req.body.saldo
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






module.exports = {
    criarContaView,
    criarConta,
    contaSelecionadaView,
    listarContasView,
    debitoView,
    debitoContaSelecionada
}