var mongoose = require("mongoose")

var periodoSchema = new mongoose.Schema({
    id : String,
    periodo : String,
    compositores : [String]
}, { versionKey: false })

module.exports = mongoose.model('periodos', periodoSchema)