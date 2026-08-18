const express = require("express");

const router = express.Router();

const links = [];
let proximoId = 1;

// GET /links — lista todos os links.
router.get("/", (req, res) => {
  res.status(200).json(links);
});

// POST /links — cria um link { titulo, url }.
router.post("/", (req, res) => {
  const { titulo, url } = req.body;

  if (
    typeof titulo !== "string" ||
    typeof url !== "string" ||
    titulo.trim() === "" ||
    url.trim() === ""
  ) {
    return res.status(400).json({ erro: "titulo e url são obrigatórios" });
  }

  const link = {
    id: proximoId++,
    titulo,
    url,
  };

  links.push(link);
  res.status(201).json(link);
});

module.exports = router;
