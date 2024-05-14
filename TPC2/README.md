# Construir páginas HTML com base num ficheiro .json

## Descrição
Neste trabalho será construída uma página html para cada uma das cidades através de um script python que vai ler de um ficheiro .json e uma página indice onde o nome de cada rua vai ter uma hiperligação para a própria página.

## Resolução
Primeiro criei um script em python para ler as informações do json e adicionar à pasta Cidades, a página html de cada rua da cidade de Braga e de seguida criei um servidor utilizando Node.js. O servidor faz pedidos usando o axios e se estivermos na página do indíce, vai buscar ao json atráves de ``axios.get("http://localhost:3000/cidades")``, criando assim a lista de todas as cidades. Cada um dos indices tem uma ligação para a página.