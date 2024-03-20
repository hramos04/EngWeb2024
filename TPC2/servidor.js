var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');

http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

    var q = url.parse(req.url, true);

    var lastIndex = q.pathname.lastIndexOf("/c");
    var pagina = ""
    if(lastIndex !== -1){
        pagina = q.pathname.substring(lastIndex+1)
    }

    if(q.pathname == "/"){

        axios.get("http://localhost:3000/cidades")
        .then( (resp) => {
            let lista = resp.data

            res.write("<h1>Índice</h1>");
            res.write("<ul>");
            for(elem in lista){
                var link = "http://localhost:1902/" + lista[elem].id
                res.write("<li><a href='" + link + "'>" + lista[elem].nome + "</a></li>")
            }
            res.write("</ul>");
            res.end();
        }
            
        ).catch( erro => {
            console.log('ERRO: ' + erro);
            res.write("<p>Erro: " + erro + "</p>");
        })     

    }
    else if (pagina !== ""){
        var fileName = "Cidades/" + pagina + ".html"
        fs.readFile(fileName, (err, file) => {
            res.write(file);
            res.end();
        });      

    }
    else{
        res.write("Operação não suportada")
    }

}).listen(1902);

console.log('Servidor à escuta em http://localhost:1902/');