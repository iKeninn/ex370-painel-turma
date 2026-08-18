const express = require("express");

const router = express.Router();

const avisos = [];
let proximoId = 1;

// GET /avisos — lista todos os avisos.
router.get("/", (req, res) => {
  res.status(200).json(avisos);
});

// POST /avisos — cria um aviso { titulo, mensagem }.
router.post("/", (req, res) => {
  const { titulo, mensagem } = req.body;

  if (
    typeof titulo !== "string" ||
    typeof mensagem !== "string" ||
    titulo.trim() === "" ||
    mensagem.trim() === ""
  ) {
    return res.status(400).json({ erro: "titulo e mensagem são obrigatórios" });
  }

  const aviso = {
    id: proximoId++,
    titulo,
    mensagem,
  };

  avisos.push(aviso);
  res.status(201).json(aviso);
});

module.exports = router;
