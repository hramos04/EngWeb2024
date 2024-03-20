import re

with open ("filmes.json", "r", encoding = "utf-8") as f:
    filmes = f.read()
    
res = '{\n"filmes":[\n' + re.sub(r"^({.+})$",r"\1,",filmes,flags=re.MULTILINE)[:-2] + ']}'

with open ("filmesFinal.json", "w", encoding = "utf-8") as f:
    f.write(res)