const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Setor = require('./Setor')
const Atividade = db.define('atividade', {
    cod_atividade: {
        type: DataTypes.INTEGER(5)
    },
    nome_atividade: {
        type: DataTypes.STRING(50)
    }
},{
    createdAt: false,
    updatedAt: false
})

Setor.hasMany(Atividade)
Atividade.belongsTo(Setor)

// Atividade.sync({force:true})

module.exports = Atividade 