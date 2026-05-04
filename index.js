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

app.delete('/api/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = filmes.findIndex(f => f.id === id);
  if (index === -1) {
    return res.status(404).send();
  }
  filmes.splice(index, 1);
  return res.status(204).send();
});

/* istanbul ignore next */
if (require.main === module) {
  app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
  });
}

module.exports = app;