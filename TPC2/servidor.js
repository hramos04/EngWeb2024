var http = require('http')
var url = require('url')
var axios = require('axios')

http.createServer(function(req, res) {
    console.log(req.method + " " + req.url)
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})

    var q = url.parse(req.url, true)
    if (q.pathname == '/'){
        
        axios.get("http://localhost:17002/cidades")
        .then((resp) => {
            let lista = resp.data
        
            res.write("<h2>Índice das Cidades</h2>")
            res.write("<ul>")
            for(elem in lista){
                res.write("<li>"+elem.nome+"</li>")
            }
            res.write("</ul>")
        }) 
        .catch( erro => {
            console.log('ERRO: ' + erro)
    
    
        })
    } else {
        res.write("Operacao nao suportada")
    }
    res.end()
}).listen(17002);