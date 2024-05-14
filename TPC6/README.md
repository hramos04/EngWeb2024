# Construir páginas HTML com base num ficheiro .json utilizando Express e MongoDB

## Descrição
Neste trabalho será construída uma aplicação para gerir uma base de dados de cantores musicais através do Express e MongoDB. 
1. Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
2. Criar uma aplicação Web com as seguintes caraterísticas:
    1. CRUD sob re compositores;
    2. CRUD sobre periodos musicais.
3. Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.

## Resolução
Primeiro criei um script em python para corrigir o ficheiro json que continha erros. De seguida criei um servidor em Node.js que acede ao ficheiro json para realizar as operações **get**, **post**, **put** e **delete**. Utilizamos o express para gerarmos as páginas em pug e redirecionamos para cada um deles e com o mongoDB onde estavam previamente inseridos na base de dados os ficheiros json, acedemos a cada um dos dados.