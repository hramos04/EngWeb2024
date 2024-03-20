import json

file = open("mapaVirtual.json", "r", encoding="utf-8")
data = json.load(file)

for cidade in data['cidades']:
    id = cidade['id']
    nome = cidade['nome']
    populacao = cidade['população']
    descricao = cidade['descrição']
    distrito = cidade['distrito']

    html = """
    <!DOCTYPE html>
    <html lang="pt PT">
    <head>
        <meta charset="UTF-8">
        <title>Cidades e ligações</title>
    </head>
    <body>
    """

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

            for cidade_destino in data['cidades']:
                if cidade_destino['id'] == destino:
                    html += f"""
                    <br>Nome: {cidade_destino['nome']}</br>
                    <br>Distância: {distancia}</br>
                    """

    html += """
    </body>
    </html>
    """

    with open(f"./Cidades/{id}.html", "w", encoding="utf-8") as f:  # Aqui modifiquei para abrir o arquivo em modo de escrita "w"
        f.write(html)