const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Gerente = db.define('gerente', {
    nome: {
        type: DataTypes.STRING(50)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    senha: {
        type: DataTypes.STRING(50)
    }
},{
    createdAt: false,
    updatedAt: false
})

// Gerente.sync({force:true})

module.exports = Gerente 