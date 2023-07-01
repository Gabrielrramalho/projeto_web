const Sequelize = require('sequelize');
const database = require('../db');
const Pessoa = require('./pessoa');


const Usuario = database.define('usuario', {
    id: {
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
    }
});


Usuario.belongsTo(Pessoa,{
    constraint: true,
    foreignKey: 'usuarioId'
});



module.exports = Usuario;
