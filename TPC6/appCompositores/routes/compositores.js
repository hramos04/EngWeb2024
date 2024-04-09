var express = require('express');
var router = express.Router();
var axios = require('axios');
var Compositor = require("../controllers/compositores")

var d = new Date().toISOString().substring(0, 16)

router.get('/', function(req, res, next) {
  Compositor.list()
    .then(response => {
       res.status(200).render("compositoresListPage", {"compositores": response, "d": d})
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
  Compositor.insert(result)
    .then(resp => {
        res.status(201).redirect('/compositores')
    })
    .catch(function(erro){
      res.status(504).render("error", { "error": erro })
    })
});

router.get('/:idCompositor', function(req, res, next) {               
  Compositor.findById(req.params.idCompositor)
  .then(resp => {
    var compositor = resp.data
    res.status(200).render("compositorPage", {"compositor": compositor, "d": d })
  })
  .catch(erro => {
    res.status(502).render("error", { "error": erro })
  })
});

router.get('/edit/:idCompositor', function(req, res, next) {               
  Compositor.findById(req.params.idCompositor)
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
  Compositor.update(req.params.idCompositor, result)
      .then(resp => {
          res.status(201).redirect('/compositores')
      })
      .catch(function(erro){
        res.status(504).render("error", { "error": erro })
      })
});

router.get('/delete/:idCompositor', function(req, res, next) {
  Compositor.remove(req.params.idCompositor)
  .then(resp => {
    res.status(200).redirect("/compositores")
  })
  .catch(erro => {
    res.status(504).render("error", { "error": erro })
  })
});



module.exports = router;
