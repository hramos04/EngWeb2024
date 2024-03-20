// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /compositores --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/compositores")){
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                        .then(response => {
                            var compositores = response.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(compositores, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel obter a lista de compositores...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    
                    axios.get('http://localhost:3000/compositores/'+id)
                        .then(response => {
                            var compositores = response.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorPage(compositores, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel obter o compositor...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        })
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C\d+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + id)
                    .then(response => {
                        var compositores = response.data
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.compositorFormEditPage(compositores, d))
                    })
                    .catch( function(erro){
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel editar o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C\d+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.write(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                        res.write("<p><a href='/compositores'> [Return] </a></p>")
                        res.end()
                    })
                    .catch( function(erro){
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel eliminar o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }
                // GET /compositores/registo --------------------------------------------------------------------
                else if(req.url == "/compositores/registo"){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositorFormPage(d))
                        res.end()
                }
                // GET /periodos --------------------------------------------------------------------
                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos?_sort=nome')
                        .then(response => {
                            var periodos = response.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(periodos, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel obter a lista de periodos...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        })
                }
                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/P[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[2]
                    
                    axios.get('http://localhost:3000/periodos/'+id)
                        .then(response => {
                            var periodos = response.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosPage(periodos, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possivel obter o período...')
                            res.write('<p>'+erro+'</p>')
                            res.end()
                        })
                }
                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P\d+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/periodos/' + id)
                    .then(response => {
                        var periodos = response.data
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.end(templates.periodosFormEditPage(periodos, d))
                    })
                    .catch( function(erro){
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel editar o período...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }
                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if(/\periodos\/delete\/P[0-9]+$/.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + id)
                    .then( resposta => {
                        res.writeHead(200, {'Content-Type': 'text/html'})
                        res.write(`<pre>${JSON.stringify(resposta.data)}</pre>`)
                        res.write("<p><a href='/periodos'> [Return] </a></p>")
                        res.end()
                    })
                    .catch( function(erro){
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possivel eliminar o compositor...')
                        res.write('<p>'+erro+'</p>')
                        res.end()
                    })
                }
                // GET /periodos/registo --------------------------------------------------------------------
                else if(req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.periodosFormPage(d))
                    res.end()
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write('<p>Pedido não suportado: '+ req.url + '</p>')
                    res.write("<p><a href='/'>Voltar</a></p>")
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if(req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/compositores', result)
                            .then(resp => {
                                res.writeHead(302, {'Location': 'http://localhost:3040/compositores/'+resp.data.id})
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possivel adicionar o compositor...')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            })
                    })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C\d+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/compositores/" + id, result)
                            .then( resposta => {
                                var compositor = resposta.data
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.write(templates.compositorPage(compositor, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possivel editar o compositor...')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                else if(req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/periodos', result)
                            .then(resp => {
                                res.writeHead(302, {'Location': 'http://localhost:3040/periodos/'+resp.data.id})
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possivel adicionar o periodo...')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            })
                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P\d+/.test(req.url)) {
                    var id = req.url.split('/')[3]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + id, result)
                            .then( resposta => {
                                var periodos = resposta.data
                                res.writeHead(200, {'Content-Type': 'text/html'})
                                res.write(templates.periodosPage(periodos, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possivel editar o periodo...')
                                res.write('<p>'+erro+'</p>')
                                res.end()
                            })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write('<p>Metodo POST não suportado:'+ req.url + '</p>')
                    res.write("<p><a href='/'>Voltar</a></p>")
                    res.end()
                }
                break;
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write('<p>Metodo nao suportado: ' + req.method + '</p>')
                res.end()
                break;
        }
    }
})

compositoresServer.listen(3040, ()=>{
    console.log("Servidor à escuta na porta 3040...")
})


