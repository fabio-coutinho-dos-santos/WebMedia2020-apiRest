const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/db_mestrado'

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  
  module.exports = mongoose.createConnection(url, options, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + url + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + url);
    }
  });
  
 mongoose.connect(url,{useNewUrlParser: true})
  
 //mongoose.connect(url, options)
  
  
 mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório"
 mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'!"
 