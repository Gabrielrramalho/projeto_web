const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario');
const Movimento = require('./movimento');



const Conta = database.define('conta', {
    conta_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Usuario,
            key: 'id',
        }
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

Usuario.hasMany(Conta, { foreignKey: 'usuario_id' });
Conta.belongsTo(Movimento, { foreignKey: 'conta_id' });


module.exports = Movimento;


