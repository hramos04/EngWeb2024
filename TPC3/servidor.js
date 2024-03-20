var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);
    var q = url.parse(req.url, true);

    if (q.pathname == '/filmes'){
        axios.get("http://localhost:3000/filmes")
        .then(dados=>{
            let lista = dados.data;

        res.write("<style>");
        res.write("table { width: 100%; border-collapse: collapse; }");
        res.write("th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }");
        res.write("tr:nth-child(odd) { background-color: #f2f2f2; }");
        res.write("</style>");

        res.write("<h1>Filmes: </h1>");
        res.write("<table>");
        res.write("<tr><th style='background-color: #ccc;'>Filme</th></tr>");

        for (elem in lista) {
            var link = "http://localhost:3001/filmes/" + lista[elem]._id.$oid;
            res.write("<tr>");
            res.write("<td><a href='" + link + "'>" + lista[elem].title + "</a></td>");
            res.write("</tr>");
        }

        res.write("</table>");
        res.end();
        })
        .catch(erro => {
            res.write("Erro: " + erro)
            res.end()
        })
    } else if (q.pathname.startsWith("/filmes/")) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        let id = q.pathname.substring(8);

        axios.get("http://localhost:3000/filmes?_id.$oid=" + id)
        .then(dados=>{
            let filme = dados.data[0];

            res.write("<h2>" + filme.title + "</h2>");
            res.write("<p><strong>Ano: </strong>" + filme.year + "</p>");
            res.write("<p><strong>Elenco: </strong>" + filme.cast + "</p>");
            res.write("<p><strong>Géneros: </strong>" + filme.genres + "</p>");
            res.end();
        })
        .catch(erro => {
            res.write("Erro: " + erro)
            res.end()
        })
    } else if (q.pathname == '/atores'){
        axios.get("http://localhost:3000/filmes")
        .then(dados=>{
            let lista = dados.data;

            let atores = new Set();

        res.write("<style>");
        res.write("table { width: 100%; border-collapse: collapse; }");
        res.write("th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }");
        res.write("tr:nth-child(odd) { background-color: #f2f2f2; }");
        res.write("</style>");

        res.write("<h1>Atores: </h1>");
        res.write("<table>");
        res.write("<tr><th style='background-color: #ccc;'>Ator</th></tr>");

        for (elem in lista) {
            if(lista[elem].cast && lista[elem].cast.length > 0)
                var ator = lista[elem].cast[0];
                if(!atores.has(ator)){
                    atores.add(ator);
                    var link = "http://localhost:3001/atores/" + lista[elem].ator;
                    res.write("<tr>");
                    res.write("<td><a href='" + link + "'>" + ator + "</a></td>");
                    res.write("</tr>");
                }
        }
        
        res.write("</table>");
        res.end();
        })
        .catch(erro => {
            res.write("Erro: " + erro)
            res.end()
        })
    } else if (q.pathname == '/generos'){
        axios.get("http://localhost:3000/filmes/")
        .then(dados=>{
            let lista = dados.data;

            let generos = new Set();

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write("<style>");
        res.write("table { width: 100%; border-collapse: collapse; }");
        res.write("th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }");
        res.write("tr:nth-child(odd) { background-color: #f2f2f2; }");
        res.write("</style>");

        res.write("<h1>Géneros: </h1>");
        res.write("<table>");
        res.write("<tr><th style='background-color: #ccc;'>Género</th></tr>");

        for (elem in lista) {
            if(lista[elem].genres && lista[elem].genres.length > 0){ 
                var genero = lista[elem].genres[0]
                if(!generos.has(genero)){
                    generos.add(genero);
                    var link = "http://localhost:3001/generos/" + genero;

                    res.write("<tr>");
                    res.write("<td><a href='" + link + "'>" + genero + "</a></td>");
                    res.write("</tr>");
                }
            }
        }

        res.write("</table>");
        res.end();
        })
        .catch(erro => {
            res.write("Erro: " + erro)
            res.end()
        })
    } else if(q.pathname == '/'){
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write("<p><a href='/filmes'><h3>Lista de filmes</h3></a></p>")
        res.write("<p><a href='/atores'><h3>Lista de atores</h3></a></p>")
        res.write("<p><a href='/generos'><h3>Lista de géneros</h3></a></p>")
        res.end()
    } else if (q.pathname == '/w3.css'){
        fs.readFile('w3.css', (erro, dados) => {
            res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'})
            res.write(dados)
            res.end()
        })
    } else {
        res.write("Erro...")
        res.end();
    }

}).listen(3001);

console.log("http://localhost:3001")