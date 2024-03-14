import json

with open("compositores.json", "r", encoding="utf-8") as f:
    data = json.loads(f.read())

periodos = []

for compositor in data['compositores']:
    periodo = compositor['periodo']
    if periodo not in [p['periodo'] for p in periodos]:
        periodos.append({'id': f'P{len(periodos) + 1}', 'periodo': periodo, 'compositores': [compositor['nome']]})
    else:
        for p in periodos:
            if p['periodo'] == periodo:
                p['compositores'].append(compositor['nome'])

final_data = {'compositores': data['compositores'], 'periodos': periodos}  

with open("compositoresFinal.json", "w", encoding="utf-8") as f:
    json.dump(final_data, f, ensure_ascii=False, indent=4)