const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('estudo_ma', 'root', 'miguel123', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('Conexão realizada')
// }).catch((error)=>{
//     console.error('Erro de conexão'+ error)
// })

module.exports = sequelize