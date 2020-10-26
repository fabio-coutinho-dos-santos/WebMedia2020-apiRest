const port = 3000
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')


server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(queryParser())
server.use(allowCors)

server.listen(process.emit.PORT||port,()=>{
    console.log("Backend rodando na porta " + port)
})

module.exports = server