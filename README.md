# API de Filmes

## Como executar

1. Instale as dependências:
npm install

2. Execute:
node index.js

3. Acesse:
http://localhost:8080/api/filmes

## Workflow utilizado

Foi utilizado o Git Flow simplificado:

- A branch main contém o código estável
- Foi criada uma branch feature (feature/post-filmes)
- A nova funcionalidade (rota POST) foi desenvolvida nela
- Após finalização, foi feito merge para a main

Motivo:
Esse fluxo permite desenvolver novas funcionalidades sem afetar a versão principal da aplicação.

## Github Actions

1. Workflow de Push

O workflow push-workflow é acionado sempre que ocorre um push nas seguintes branches:
- master
- feature/*
- bugfix/*

2. Workflow de Pull Request

O workflow pull-request-workflow é acionado sempre que um Pull Request é aberto ou atualizado com destino à branch:
- master