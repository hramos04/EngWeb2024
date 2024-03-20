var express = require('express');
var router = express.Router();
var axios = require('axios');

var d = new Date().toISOString().substring(0, 16)

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/periodos?_sort=nome')
    .then(response => {
        var periodos = response.data
       res.status(200).render("periodosListPage", {"periodos": periodos, "d": d})
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
axios.post('http://localhost:3000/periodos', result)
    .then(resp => {
        res.status(201).redirect('/periodos')
    })
    .catch(function(erro){
    res.status(504).render("error", { "error": erro })
    })
});

router.get('/:idPeriodo', function(req, res, next) {               
    axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      var periodo = resp.data
      res.status(200).render("periodoPage", {"periodo": periodo, "d": d })
    })
    .catch(erro => {
      res.status(502).render("error", { "error": erro })
    })
  });

router.get('/edit/:idPeriodo', function(req, res, next) {               
axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
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
axios.put('http://localhost:3000/periodos/' + req.params.idPeriodo, result)
    .then(resp => {
        res.status(201).redirect('/periodos')
    })
    .catch(function(erro){
        res.status(504).render("error", { "error": erro })
    })
});

router.get('/delete/:idPeriodo', function(req, res, next) {
    axios.delete("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      res.status(200).redirect("/periodos")
    })
    .catch(erro => {
      res.status(504).render("error", { "error": erro })
    })
});




module.exports = router;
