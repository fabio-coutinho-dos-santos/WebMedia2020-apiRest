const express = require('express')

module.exports = function(server)
{
    const api = express.Router()
    server.use('/api',api)

    const testeService = require('../Teste/testeService')
    testeService.register(api,'/teste')
}