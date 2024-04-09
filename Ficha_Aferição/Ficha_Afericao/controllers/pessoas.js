const mongoose = require('mongoose')
const { modelName } = require("../models/pessoas")
var Pessoa = require("../models/pessoas")

module.exports.list = () => {
    return Pessoa
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = id => {
    return Pessoa
        .findOne({id : id})
        .exec()
}

module.exports.insert = pessoa => {
    if((Pessoa.find({id : pessoa.id}).exec()).length != 1){
        var newPessoa = new Pessoa(pessoa)
        return newPessoa.save()
    }
}

module.exports.update = (id, pessoa) => {
    return Pessoa
        .findByIdAndUpdate(id, pessoa, {new : true})
        .exec()
}

module.exports.remove = id => {
    return Compositor
        .findByIdAndDelete(id)
        .exec()
}