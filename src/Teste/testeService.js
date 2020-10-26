const Teste = require('./teste')
const lodash = require('lodash')

Teste.methods(['get','post','put','delete'])
Teste.updateOptions({new:true, runValidators:true})

Teste.after('post', sendErrorsOrNext).after('put',sendErrorsOrNext)

function sendErrorsOrNext(req,resp,next){
    const bundle = resp.locals.bundle

    if(bundle.errors){
        var errors = parseErrors(bundle.errors)
        resp.status(500).json({errors})
    }else{
        next()
    }
}

function parseErrors(nodeRestfulErrors){

    const errors = []
    lodash.forIn(nodeRestfulErrors, error =>{
        errors.push(error.message)
    })
}

Teste.route('mediaAndroid',(req, resp, next)=>{
    //const broker = req.body.broker || ''
    Teste.find((err, teste)=>{
        if(err) {
            return sendErrorsFromDB(res, err)
        }else if(teste){

            if(teste == "")
                return resp.status(400).send({errors: ['Não há mensagem.']})
            
            else{
                Teste.aggregate(
                    {$match: {app: "Android"}},
                    {$group:{_id:null, media:{$avg:"$tempototal"}, 
                                       min:{$min:"$tempototal"},
                                       max:{$max:"$tempototal"},
                                       desvio:{$stdDevSamp:"$tempototal"}}
                    
                },{$project:{_id:0, 
                    media:1,
                    min:1,
                    max:1,
                    desvio:1 }
                
                },function (err, result) {
                    if(err) {
                        return resp.status(800).json({errors:[err]})
                    }else{
                        resp.json(lodash.defaults(result[0]))
                    }
                })

            }
        }else{
            return resp.status(400).send({errors: ['Não há mensagem.']})
        }
    })
})


Teste.route('mediaIonic',(req, resp, next)=>{
    //const broker = req.body.broker || ''
    Teste.find((err, teste)=>{
        if(err) {
            return sendErrorsFromDB(res, err)
        }else if(teste){

            if(teste == "")
                return resp.status(400).send({errors: ['Não há mensagem.']})
            
            else{
                Teste.aggregate(
                    {$match: {app: "Ionic"}},
                    {$group:{_id:null, media:{$avg:"$tempototal"}, 
                                       min:{$min:"$tempototal"},
                                       max:{$max:"$tempototal"},
                                       desvio:{$stdDevSamp:"$tempototal"},}                    
                },{$project:{_id:0, 
                    media:1,
                    min:1,
                    max:1,
                    desvio:1}
                
                },function (err, result) {
                    if(err) {
                        return resp.status(800).json({errors:[err]})
                    }else{
                        resp.json(lodash.defaults(result[0]))
                    }
                })

            }
        }else{
            return resp.status(400).send({errors: ['Não há mensagem.']})
        }
    })
})


Teste.route('mediaReactNative',(req, resp, next)=>{
    //const broker = req.body.broker || ''
    Teste.find((err, teste)=>{
        if(err) {
            return sendErrorsFromDB(res, err)
        }else if(teste){

            if(teste == "")
                return resp.status(400).send({errors: ['Não há mensagem.']})
            
            else{
                Teste.aggregate(
                    {$match: {app: "ReactNative"}},
                    {$group:{_id:null, media:{$avg:"$tempototal"}, 
                                       min:{$min:"$tempototal"},
                                       max:{$max:"$tempototal"},
                                       desvio:{$stdDevSamp:"$tempototal"}}
                    
                },{$project:{_id:0, 
                    media:1,
                    min:1,
                    max:1,
                    desvio:1 }
                
                },function (err, result) {
                    if(err) {
                        return resp.status(800).json({errors:[err]})
                    }else{
                        resp.json(lodash.defaults(result[0]))
                    }
                })

            }
        }else{
            return resp.status(400).send({errors: ['Não há mensagem.']})
        }
    })
})


// Teste.route('countHivemq',(req, resp, next)=>{
//     const broker = req.body.broker || ''
//     Teste.find((err, mensagem)=>{
//         if(err) {
//             return sendErrorsFromDB(res, err)
//         }else if(mensagem){

//             if(mensagem == "")
//                 return resp.status(400).send({errors: ['Não há mensagem.']})
            
//             else{
//                 Mensagem.aggregate(
//                     {$match: {broker: broker}  
//                 },{
//                     $count: "count"
//                   },function (err, result) {
//                     if(err) {
//                         return resp.status(800).json({errors:[err]})
//                     }else{
//                         resp.json(lodash.defaults(result[0]))
//                     }
//                 })

//             }
//         }else{
//             return resp.status(400).send({errors: ['Não há mensagem.']})
//         }
//     })
// })

module.exports = Teste