var express = require('express');
var router = express.Router();
var axios = require('axios');

var d = new Date().toISOString().substring(0, 16)

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(response => {
        var compositores = response.data
       res.status(200).render("compositoresListPage", {"compositores": compositores, "d": d})
    })
    .catch(function(erro){
        res.status(501).render("error", {"error": erro})
    })
});

router.get('/registo', function(req, res, next) {
  res.status(200).render("compositorFormPage", {"d": d})
});

router.post('/registo', function(req, res, next) {
  result = req.body
  axios.post('http://localhost:3000/compositores', result)
    .then(resp => {
        res.status(201).redirect('/compositores')
    })
    .catch(function(erro){
      res.status(504).render("error", { "error": erro })
    })
});

router.get('/:idCompositor', function(req, res, next) {               
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
    var compositor = resp.data
    res.status(200).render("compositorPage", {"compositor": compositor, "d": d })
  })
  .catch(erro => {
    res.status(502).render("error", { "error": erro })
  })
});

router.get('/edit/:idCompositor', function(req, res, next) {               
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
    var compositor = resp.data
    res.status(200).render("compositorFormEditPage", {"compositor": compositor, "d": d })
  })
  .catch(erro => {
    res.status(503).render("error", { "error": erro })
  })
});

router.post('/edit/:idCompositor', function(req, res, next) {
  result = req.body
  axios.put('http://localhost:3000/compositores/' + req.params.idCompositor, result)
      .then(resp => {
          res.status(201).redirect('/compositores')
      })
      .catch(function(erro){
        res.status(504).render("error", { "error": erro })
      })
});

router.get('/delete/:idCompositor', function(req, res, next) {
  axios.delete("http://localhost:3000/compositores/" + req.params.idCompositor)
  .then(resp => {
    res.status(200).redirect("/compositores")
  })
  .catch(erro => {
    res.status(504).render("error", { "error": erro })
  })
});



module.exports = router;
