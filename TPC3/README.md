# Construir páginas HTML com base num ficheiro .json utilizando Node.js

## Descrição
Neste trabalho será construída uma página com o nome de todos os filmes, páginas individuais para cada um dos filmes, uma página com  o nome de todos os atores, páginas individuais para cada um dos atores, uma página com o nome de todos os géneros de filmes e páginas individuais para cada um dos géneros de filmes.

## Resolução
Primeiro criei um script em python para corrigir o ficheiro json que continha erros. De seguida criei um servidor em Node.js que faz pedidos ao ficheiro json através de ``axios.get("http://localhost:3000/filmes")`` se o pathname do url for "/filmes", "/generos" ou "/atores" mostrando para cada um deles a respetiva lista de filmes, generos ou atores. Se o path name for "/filmes/", "/generos/" ou "/atores/", fazemos na mesma um pedido através do ``axios.get("http://localhost:3000/filmes")`` mas, através de uma expressão regular, lemos do url o Id de cada uma das categorias e acedemos às informações de cada uma presentes no json.