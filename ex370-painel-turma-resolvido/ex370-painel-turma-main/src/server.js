const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /health — já implementada. Use para conferir que o servidor sobe.
// Os testes de correção esperam que GET /health responda com status 200.
app.get("/health", (req, res) => {
  res.json({ status: "ok", projeto: "Painel da Turma" });
});

// Três módulos independentes — um por integrante do trio.
// O roteamento já está pronto; cada pessoa implementa o SEU arquivo em src/rotas/.
app.use("/avisos", require("./rotas/avisos")); // Tarefa A
app.use("/links", require("./rotas/links")); // Tarefa B
app.use("/enquete", require("./rotas/enquete")); // Tarefa C

app.listen(PORT, () => {
  console.log(`Painel da Turma rodando em http://localhost:${PORT}`);
});

module.exports = app;
