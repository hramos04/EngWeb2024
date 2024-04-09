var express = require('express');
var router = express.Router();
var axios = require('axios');
var Periodo = require("../controllers/periodos")

var d = new Date().toISOString().substring(0, 16)

router.get('/', function(req, res, next) {
  Periodo.list()
  .then(response => {
      res.status(200).render("periodosListPage", {"periodos": response, "d": d})
  })
  .catch(function(erro){
      res.status(501).render("error", {"error": erro})
  })
});

router.get('/registo', function(req, res, next) {
  res.status(200).render("periodoFormPage", {"d": d})
});
  
router.post('/registo', function(req, res, next) {
  result = req.body
  Periodo.insert(result)
  .then(resp => {
      res.status(201).redirect('/periodos')
  })
  .catch(function(erro){
  res.status(504).render("error", { "error": erro })
  })
});

router.get('/:idPeriodo', function(req, res, next) {               
  Periodo.findById(req.params.idPeriodo)
  .then(resp => {
    var periodo = resp.data
    res.status(200).render("periodoPage", {"periodo": periodo, "d": d })
  })
  .catch(erro => {
    res.status(502).render("error", { "error": erro })
  })
  });

router.get('/edit/:idPeriodo', function(req, res, next) {               
  Periodo.findById(req.params.idPeriodo)
  .then(resp => {
      var periodo = resp.data
      res.status(200).render("periodoFormEditPage", {"periodo": periodo, "d": d })
  })
  .catch(erro => {
      res.status(503).render("error", { "error": erro })
  })
});

router.post('/edit/:idPeriodo', function(req, res, next) {
  result = req.body
  Periodo.update(req.params.idPeriodo, result)
  .then(resp => {
      res.status(201).redirect('/periodos')
  })
  .catch(function(erro){
      res.status(504).render("error", { "error": erro })
  })
});

router.get('/delete/:idPeriodo', function(req, res, next) {
  Periodo.remove(req.params.idPeriodo)
  .then(resp => {
    res.status(200).redirect("/periodos")
  })
  .catch(erro => {
    res.status(504).render("error", { "error": erro })
  })
});




module.exports = router;
