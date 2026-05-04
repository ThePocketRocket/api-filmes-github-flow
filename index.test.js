const request = require('supertest');
const app = require('./index');

describe('Testes da API de Filmes', () => {
  it('Deve retornar a lista inicial de filmes (GET /api/filmes)', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty('nome', 'Matrix');
  });

  it('Deve adicionar um novo filme (POST /api/filmes)', async () => {
    const novoFilme = { id: 3, nome: "A Origem" };
    const res = await request(app).post('/api/filmes').send(novoFilme);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('nome', 'A Origem');
  });
});
