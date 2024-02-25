import json
 
file = open("mapaVirtual.json", "r", encoding="utf-8")

data = json.load(file)

html = """
<!DOCTYPE html>
<html lang="pt PT">
<head> 
    <meta charset="UTF-8">
    <title>Cidades e ligações</title>
<body>"""

for cidade in data['cidades']:
    id = cidade['id']
    nome = cidade['nome']
    populacao = cidade['população']
    descricao = cidade['descrição'] 
    distrito = cidade['distrito']    

    html += f"""
    <h1>{nome}</h1>
    <br>Id: {id}</br>
    <br>População: {populacao}</br>
    <br>Descrição: {descricao}</br>
    <br>Distrito: {distrito}</br>
    <h2>Ligações</h2>
    """

    for ligacao in data['ligacoes']:
        if ligacao['origem'] == id:
            destino = ligacao['destino']
            distancia = ligacao['distância']

            for nome in data['cidades']:
                if nome['id'] == destino:
                    html += f"""
                    <br>Nome: {nome['nome']}</br>
                    <br>Distância: {distancia}</br>
                    """
                
    with open(f"./Cidades/{id}.html", "wb") as f:
        f.write(html.encode('utf-8'))
