const express = require("express");

const router = express.Router();

const opcoes = [
  { nome: "Presencial", votos: 0 },
  { nome: "Remoto", votos: 0 },
  { nome: "Híbrido", votos: 0 },
];

// GET /enquete — retorna as opções com a contagem de votos.
router.get("/", (req, res) => {
  res.status(200).json({ opcoes });
});

// POST /enquete/voto — incrementa o voto da opção escolhida.
router.post("/voto", (req, res) => {
  const { opcao } = req.body;

  const opcaoEncontrada = opcoes.find(
    (item) => item.nome === opcao
  );

  if (typeof opcao !== "string" || !opcaoEncontrada) {
    return res.status(400).json({ erro: "opção não encontrada" });
  }

  opcaoEncontrada.votos += 1;

  res.status(200).json(opcaoEncontrada);
});

module.exports = router;
