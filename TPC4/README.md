# Construir páginas HTML com base num ficheiro .json utilizando Node.js

## Descrição
Neste trabalho será construída uma aplicação para gerir uma base de dados de cantores musicais. 
1. Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
2. Criar uma aplicação Web com as seguintes caraterísticas:
    1. CRUD sob re compositores;
    2. CRUD sobre periodos musicais.
3. Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.

## Resolução
Primeiro criei um script em python para corrigir o ficheiro json que continha erros. De seguida criei um servidor em Node.js que acede ao ficheiro json para realizar as operações **get**, **post**, **put** e **delete**. Para cada um dos casos, no ficheiro templates.js, tem a página html que é mostrada consoante o que for especificado no url com base nos botões que forem carregados.