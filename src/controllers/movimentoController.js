const Movimento = require('../models/movimento');

Conta = require('../models/conta');



function realizarMovimentoView(req, res) {

  contaId = req.params.id;

  Conta.findOne({ where: { id: contaId } }).then((conta) => {
    res.render('movimento.html', { conta })
  }).catch((err) => {
    res.render('movimento.html', { erro: "Erro ao selecionar conta!!" });
  });



}


async function realizarMovimento(req, res) {
  const valor = parseFloat(req.body.valor_c);
  const idContaOrigem = req.params.id;
  const numeroContaDestino = req.body.conta_destino;
  let numeroContaOrigem;

  try {
    const contaOrigem = await Conta.findByPk(idContaOrigem);

    if (!contaOrigem) {
      throw new Error("Conta de origem não encontrada");
    }

    numeroContaOrigem = contaOrigem.numero;

    const contaDestino = await Conta.findOne({ where: { numero: numeroContaDestino } });

    if (!contaDestino) {
      throw new Error("Conta de destino não encontrada");
    }

    let saldoOrigem = parseFloat(contaOrigem.saldo);
    let saldoDestino = parseFloat(contaDestino.saldo);

    if (saldoOrigem < valor) {
      throw new Error("Saldo insuficiente na conta de origem");
    }

    saldoOrigem -= valor;
    saldoDestino += valor;

    await Promise.all([
      Conta.update({ saldo: saldoOrigem }, { where: { numero: numeroContaOrigem } }),
      Conta.update({ saldo: saldoDestino }, { where: { numero: numeroContaDestino } })
    ]);

    const dataAtual = new Date();
    const dataMovimento = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

    let movimento1 = {
      tipo: 'C',
      data_movimento: dataMovimento,
      valor: req.body.valor_c,
      conta_origem: numeroContaOrigem,
      conta_destino: numeroContaDestino,
      observacao: req.body.observacao,
      contaId: idContaOrigem
    };

    let movimento2 = {
      tipo: 'D',
      data_movimento: dataMovimento,
      valor: req.body.valor_c,
      conta_origem: numeroContaOrigem,
      conta_destino: numeroContaDestino,
      observacao: req.body.observacao,
      contaId: contaDestino.id
    };

    console.log(movimento1);
    console.log(movimento2);

    await Promise.all([
      Movimento.create(movimento1),
      Movimento.create(movimento2)
    ]);

    res.redirect(`/conta/selecionada/${idContaOrigem}`);
  } catch (err) {
    console.log(err);
    res.render("movimento.html", { erro: err });
  }
}
function formatarData(data) {
  if (data instanceof Date && !isNaN(data)) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  } else if (typeof data === 'string') {
    const dataSemHora = data.split('T')[0];
    const [ano, mes, dia] = dataSemHora.split('-');
    return `${dia}/${mes}/${ano}`;
  } else {
    return 'Data inválida';
  }
}


function listarMovimentosUsuario(req, res) {
  const idConta = req.params.id;

  Movimento.findAll({ where: { contaId: idConta } })
    .then((movimentos) => {
      movimentos.forEach((movimento) => {
        const dataFormatada = formatarData(movimento.data_movimento);
        movimento.data = dataFormatada !== 'Invalid Date' ? dataFormatada : 'Data inválida';
      });

      if (movimentos.length > 0) {
        res.render('movimentos.html', { movimentos });
      } else {
        res.render('movimentos.html', { mensagem: 'Nenhum movimento encontrado para esta conta.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render('movimentos.html', { erro: 'Erro ao listar movimentos' });
    });
}








module.exports = {
  realizarMovimentoView,
  realizarMovimento,
  listarMovimentosUsuario
};







