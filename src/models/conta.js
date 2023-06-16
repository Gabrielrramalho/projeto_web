const Sequelize = require('sequelize');
const database = require('../db');


const Conta = database.define('conta', {
    conta_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    data_abertura: {
       type: Sequelize.DATE,
       allowNull: false
    },

    saldo: {
        type: Sequelize.DOUBLE,
        allowNull:false
    }


})


