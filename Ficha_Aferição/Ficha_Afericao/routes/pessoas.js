var express = require('express');
var router = express.Router();
var axios = require('axios');
var Pessoa = require("../controllers/pessoas")

var d = new Date().toISOString().substring(0, 16)

router.get('/', function(req, res, next) {
  Pessoa.list()
    .then(response => {
       res.jsonp(response)
    })
    .catch(function(erro){
        res.status(501).render("error", {"error": erro})
    })
});


router.post('/', function(req, res, next) {
  result = req.body
  Pessoa.insert(result)
    .then(response => {
       res.jsonp(response)
    })
    .catch(function(erro){
        res.status(501).render("error", {"error": erro})
    })
});


router.put('/', function(req, res, next) {
  Pessoa.findById(req.params.idCompositor)
    .then(response => {
       res.jsonp(response)
    })
    .catch(function(erro){
        res.status(501).render("error", {"error": erro})
    })
});


router.delete('/', function(req, res, next) {
  Pessoa.remove(req.params.idCompositor)
    .then(response => {
       res.jsonp(response)
    })
    .catch(function(erro){
        res.status(501).render("error", {"error": erro})
    })
});


module.exports = router;
