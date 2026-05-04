const express = require('express');
const app = express();
app.use(express.json());

const filmes = [
  { id: 1, nome: "Matrix" },
  { id: 2, nome: "Interestelar" }
];

app.get('/api/filmes', (req, res) => {
  res.json(filmes);
});

app.post('/api/filmes', (req, res) => {
  const novoFilme = req.body;
  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});