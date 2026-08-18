# Painel da Turma — Sprint de 1 hora (trio)

Uma API REST enxuta para o **painel de uma turma**, feita para caber numa **janela de 1 hora** por um grupo de **exatamente 3 pessoas**. O objetivo é praticar **divisão de trabalho paralela**: o painel tem **três módulos independentes**, um por integrante, cada um em **seu próprio arquivo** — ninguém edita o arquivo do outro, então **não há conflito de merge** e os três trabalham ao mesmo tempo.

O template já vem pronto com o servidor Express, o roteamento dos três módulos, a rota `GET /health` e um armazenamento **em memória** (sem banco de dados). Cada integrante só preenche o seu arquivo de rota em `src/rotas/`.

Todos os corpos de requisição e respostas são **JSON** (`Content-Type: application/json`).

## Como rodar

```bash
npm install
npm start
# servidor em http://localhost:3000  ·  confira: GET /health
```

## As três tarefas paralelas (uma por pessoa)

### Tarefa A — Avisos · `src/rotas/avisos.js`
- `GET /avisos` — lista todos os avisos (**array** de objetos aviso)
- `POST /avisos` — cria um aviso. Corpo:
  - `titulo` — **texto** (string), obrigatório
  - `mensagem` — **texto** (string), obrigatório
  - Responde **201** com o aviso `{ id: número, titulo: texto, mensagem: texto }`
  - Responde **400** se faltar `titulo` ou `mensagem`

### Tarefa B — Links úteis · `src/rotas/links.js`
- `GET /links` — lista todos os links (**array** de objetos link)
- `POST /links` — cria um link. Corpo:
  - `titulo` — **texto** (string), obrigatório
  - `url` — **texto** (string), obrigatório
  - Responde **201** com o link `{ id: número, titulo: texto, url: texto }`
  - Responde **400** se faltar `titulo` ou `url`

### Tarefa C — Enquete rápida · `src/rotas/enquete.js`
- `GET /enquete` — retorna as opções com a contagem:
  - `{ opcoes: [ { nome: texto, votos: número inteiro } ] }`
- `POST /enquete/voto` — registra um voto. Corpo:
  - `opcao` — **texto** (string): o **nome** de uma opção existente (ex.: `"Presencial"`)
  - Incrementa `votos` (número inteiro) daquela opção e responde **200**
  - Responde **400** se a opção (o texto enviado) não existir

## Tipos dos dados (resumo)

| Campo | Tipo | Onde |
|---|---|---|
| `id` | número (inteiro) | gerado pelo servidor nas respostas de Avisos e Links |
| `titulo` | texto (string) | corpo de `POST /avisos` e `POST /links` |
| `mensagem` | texto (string) | corpo de `POST /avisos` |
| `url` | texto (string) | corpo de `POST /links` |
| `nome` | texto (string) | nome da opção da enquete |
| `votos` | número (inteiro) | contagem de votos de cada opção |
| `opcao` | texto (string) | corpo de `POST /enquete/voto` — o nome de uma opção existente |

## Cronograma sugerido (60 min)
- **0–5 min** — juntos: clonar, `npm install`, `npm start`, conferir `GET /health`; cada um escolhe A, B ou C.
- **5–45 min** — em paralelo: cada integrante implementa o seu módulo na sua branch.
- **45–60 min** — juntos: abrir os 3 Pull Requests, revisar, fazer merge na `main` e validar.

## O que os testes de correção validam
- `GET /health` responde **200** (o servidor sobe)
- **Avisos:** `POST /avisos` cria (**201**) e aparece em `GET /avisos`; sem `titulo`/`mensagem` → **400**
- **Links:** `POST /links` cria (**201**) e aparece em `GET /links`; sem `titulo`/`url` → **400**
- **Enquete:** `POST /enquete/voto` incrementa e `GET /enquete` reflete a nova contagem; opção inexistente → **400**

> **Entrega:** o repositório enviado deve pertencer a um dos membros do grupo, com os outros dois adicionados como colaboradores. A WebForge mede as contribuições individuais (commits, linhas +/−), então **cada um deve commitar o seu módulo**.
