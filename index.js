const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Gerente = require('./models/Gerente')
const Setor = require('./models/Setor')
const Atividade = require('./models/Atividade')

const PORT = 3000
const hostname = 'localhost'
let log = false
let nomeGerente = ''

//================================================= config express
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//================================================= config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
//================================================= 

app.post('/atualizar_setor', async (req,res)=>{
    const nome_setor = req.body.nome_setor
    const cod_setor = req.body.cod_setor
    const gerenteId= Number(req.body.gerenteId)
    const novo_nome_setor = req.body.novo_nome_setor
    const pesq = await Setor.findOne({raw:true, where: {nome_setor:nome_setor, cod_setor:cod_setor, gerenteId:gerenteId}}) 

    const dados = {
        cod_setor: cod_setor,
        nome_setor: novo_nome_setor,
        gerenteId: gerenteId
    }

    let msg = 'Setor não encontrado'
    let msg2 = 'Setor Atualizado'

    if(pesq==null){
        res.render('atualizar_setor', {log, nomeGerente, msg})
    }else{
        await Setor.update(dados, {where: {nome_setor: pesq.nome_setor}})
        res.render('atualizar_setor', {log, nomeGerente, msg2})
    }
})

app.get('/atualizar_setor', (req,res)=>{
    res.render('atualizar_setor', {log, nomeGerente})
})

app.post('/apagar_setor', async (req,res)=>{
    const cod_setor = req.body.cod_setor
    const nome_setor = req.body.nome_setor
    const pesq = await Setor.findOne({raw:true, where:{cod_setor:cod_setor, nome_setor:nome_setor}})

    let msg = 'Setor não encontrado'
    let msg2 = 'Setor Apagado!'

    if(pesq==null){
        res.render('apagar_setor', {log, nomeGerente, msg})
    }else{
        await Setor.destroy({where: {cod_setor: pesq.cod_setor, nome_setor: pesq.nome_setor}})
        res.render('apagar_setor', {log, nomeGerente, msg2})
    }
})

app.get('/apagar_setor', (req,res)=>{
    res.render('apagar_setor', {log, nomeGerente})
})

app.get('/listar_setor', async (req,res)=>{
    const pesq = await Setor.findAll({raw:true})
    res.render('listar_setor', {valores: pesq, log, nomeGerente})
})

app.post('/cadastrar_setor', async (req,res)=>{
    const cod_setor = req.body.cod_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = req.body.gerenteId

    await Setor.create({cod_setor:cod_setor, nome_setor:nome_setor, gerenteId:gerenteId})

    let msg = 'Setor Cadastrado!'
    res.render('cadastrar_setor', {log, nomeGerente, msg})
})

app.get('/cadastrar_setor', (req,res)=>{
    res.render('cadastrar_setor', {log})
})

app.get('/sistema', (req,res)=>{
    res.render('sistema', {log, nomeGerente})
})

app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Gerente.findOne({raw: true, where:{email:email, senha:senha}})
    console.log(pesq)

    let msg = 'Email ou senha inválidos'
    let msg2 = 'Bem vindo!'

    if(pesq==null){
        res.render('login', {log, msg})
    }else{
        log = true
        nomeGerente = pesq.nome
        res.render('sistema', {log, nomeGerente, msg2})
    }
})

app.get('/', (req,res)=>{
    res.render('login', {log})
})

//================================================= 
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('Erro de conexão'+ error)
})
//================================================= 