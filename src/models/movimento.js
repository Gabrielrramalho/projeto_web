const Sequelize = require('sequelize');
const database = require('../db');
const Conta = require('./conta'); // Importe o modelo Conta antes do Movimento

const Movimento = database.define('movimento', {
    movimento_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },


    tipo: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },

    data_movimento: {
        type: Sequelize.DATE,
        
    },

    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    conta_origem: {
        type: Sequelize.STRING,
        allowNull: false
    },

    conta_destino: {
        type: Sequelize.STRING,
        allowNull: false
    },

    observacao: {
        type: Sequelize.CHAR(250)
    }
});


Movimento.belongsTo(Conta,{
    constraint: true,
    foreignKey: 'contaId',
    allowNull: false
});



module.exports = Movimento;
