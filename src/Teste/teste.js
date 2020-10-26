const restful = require('node-restful')
const mongoose = restful.mongoose

const testeSchema = new mongoose.Schema({
    app:{type:String},
    mensagem:{type:String},
    tempoinicial:{type:String},
    tempofinal:{type:String},
    tempototal:{type:Number}
})

module.exports = restful.model('Teste',testeSchema)