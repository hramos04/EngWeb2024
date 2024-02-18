import os
import xml.etree.ElementTree as ET
import re

def escreveParagrafos(elemento):
    html = ""
    html += f'<p>'     
    for element in elemento.iter():
        if element.tag == 'lugar':
            html += f'{element.text}'
            html += str(element.tail)
        elif element.tag == 'data':
            html += f'{element.text}'
            html += str(element.tail)
        else:
            html += str(element.text)
    html += f'</p>\n'
    return html


def gerar_pagina_html(arquivo_xml):
    # Parseia o XML
    tree = ET.parse(arquivo_xml)
    root = tree.getroot()

    # Criação do HTML
    html = '<!DOCTYPE html>\n'
    html += '<html lang="en">\n'
    html += '<head>\n'
    html += '<meta charset="UTF-8">\n'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    html += f'<title>{arquivo_xml}</title>\n'
    html += '</head>\n'
    html += '<body>\n'

    # Adiciona a meta informação
    meta = root.find('meta')
    numero = meta.find('número').text
    nome = meta.find('nome').text
    html += f'<h1>Rua {numero}: {nome}</h1>\n'

    # Adiciona o corpo do XML ao HTML
    html += '<div>\n'
    corpo = root.find('corpo')
    for elemento in corpo:
        if elemento.tag == 'figura':
            imagem = elemento.find('imagem').attrib['path']
            legenda = elemento.find('legenda').text
            imagem_path= imagem[3:]
            html += f'<figure>\n'
            html += f'<img src=../MapaRuas-materialBase/{imagem_path} alt="{legenda}">\n'
            html += f'<figcaption>{legenda}</figcaption>\n'
            html += f'</figure>\n'
            os.chdir(os.path.dirname(__file__))
        elif elemento.tag == 'para':
            html+= escreveParagrafos(elemento)
        elif elemento.tag == 'lista-casas':
            html += '<ul>\n'
            for casa in elemento.findall('casa'):
                numero_casa = casa.find('número').text
                if casa.find('enfiteuta') is not None:
                    enfiteuta = casa.find('enfiteuta').text
                else:
                    enfiteuta = "N/A"

                if casa.find('foro') is not None:
                    foro = casa.find('foro').text
                else:
                    foro="N/A"

                if casa.find('desc') is not None:
                    for elem in casa.find('desc'):
                        desc= escreveParagrafos(elem)
                else:
                    desc="N/A"
                    
                html += f'<li>Número da casa: {numero_casa}, Enfiteuta: {enfiteuta}, Foro: {foro}, Descricao: {desc}</li>\n'
            html += '</ul>\n'

    html += '</div>\n'

    html += '</body>\n'
    html += '</html>\n'
    return html

def extrair_numero_do_arquivo(nome_arquivo):
    # Expressão regular para encontrar o número no padrão desejado
    padrao = r'MRB-(\d+)-.*\.xml'
    
    # Tenta encontrar uma correspondência com o padrão
    correspondencia = re.match(padrao, nome_arquivo)
    
    if correspondencia:
        # Retorna o número encontrado
        numero = correspondencia.group(1)
        return numero
    else:
        return None

pasta_xml = "C:/Users/hugoa/Desktop/Escola/Universidade/3ºano/2 semestre/Engenharia Web/EngWeb2024/TPC1/MapaRuas-materialBase/texto"
pasta_html = "C:/Users/hugoa/Desktop/Escola/Universidade/3ºano/2 semestre/Engenharia Web/EngWeb2024/TPC1/Ruas"

if not os.path.exists(pasta_html):
    os.makedirs(pasta_html)
    print("Pasta de saída criada com sucesso.")
else:
    print("A pasta de saída já existe.")

for arquivo_xml in os.listdir(pasta_xml):
    if arquivo_xml.endswith(".xml"):
        caminho_arquivo_xml = os.path.join(pasta_xml, arquivo_xml)
        nome_arquivo_html = f"rua_{arquivo_xml[:-4]}.html"  # Removendo a extensão .xml e adicionando prefixo "rua_"
        caminho_arquivo_html = os.path.join(pasta_html, nome_arquivo_html)
        html_resultante = gerar_pagina_html(caminho_arquivo_xml)
        with open(caminho_arquivo_html, "wb") as f:
            f.write(html_resultante.encode('utf-8'))
        print(f"Arquivo HTML '{nome_arquivo_html}' criado com sucesso.")

print("Conversão concluída. Os arquivos HTML foram salvos na pasta 'html'.")