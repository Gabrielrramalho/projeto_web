const Sequelize = require('sequelize');
const database = require('../db');
const Pessoa = require('./pessoa');
const Conta = require('./conta')


const Usuario = database.define('usuario', {
    usuario_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },

    pessoaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Pessoa,
            key: 'id',
        }
    }

})

Pessoa.hasOne(Usuario, { foreignKey: 'pessoaId' });
Conta.belongsTo(Usuario, { foreignKey: 'usuario_id' });


module.exports = Usuario;
