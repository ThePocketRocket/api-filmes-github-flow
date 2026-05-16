# API de Filmes

Uma API RESTful simples desenvolvida em Node.js com Express para o gerenciamento de filmes, criada como projeto prático para a disciplina de Gestão de Configuração e Qualidade de Código.

## 🚀 Como executar e testar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Para rodar o servidor localmente:**
   ```bash
   node index.js
   ```
   Acesse: `http://localhost:8080/api/filmes`

3. **Para rodar os testes automatizados (com relatório de cobertura):**
   ```bash
   npm test
   ```

4. **Para rodar o Linter (verificação de código):**
   ```bash
   npm run lint
   ```

5. **Para rodar usando Docker:**
   ```bash
   docker build -t api-filmes .
   docker run -p 8080:8080 api-filmes
   ```
   Acesse: `http://localhost:8080/api/filmes`

---

## 🔀 Workflow Utilizado: GitHub Flow

Este projeto adota estritamente o **GitHub Flow**:
- A branch `main` é a única branch de produção (Baseline) e é **protegida**. Ninguém faz commits diretos nela.
- Novas funcionalidades, correções ou configurações são desenvolvidas em **branches temporárias** criadas a partir da `main` (ex: `feat/remover-filmes`, `chore/configura-husky`).
- A integração do código na `main` é feita exclusivamente através de **Pull Requests**, passando obrigatoriamente pela validação da esteira de CI/CD.

---

## 🛠️ Qualidade de Código e CI/CD

O projeto conta com um ecossistema robusto para garantir a máxima qualidade de código:

1. **Testes Automatizados (Jest + Supertest)**
   - O projeto possui testes automatizados cobrindo as rotas.
   - Há uma trava no arquivo `package.json` exigindo **no mínimo 90% de cobertura** global (Coverage) em Statements, Branches, Functions e Lines.

2. **Padronização de Código (ESLint)**
   - Utilização do ESLint na sua arquitetura mais moderna (Flat Config: `eslint.config.js`) para garantir o padrão de estilo da equipe.

3. **Commits Semânticos e Husky**
   - Utilização do **Commitlint** em conjunto com os hooks do **Husky**.
   - Mensagens de commit fora do padrão convencional (ex: `feat:`, `fix:`, `chore:`, `test:`) são bloqueadas localmente no terminal antes mesmo de irem para o GitHub.

4. **Autenticidade (Commits Assinados)**
   - Como requisito de segurança da branch `main`, apenas commits **criptograficamente assinados** (via chaves GPG ou SSH) são aceitos. Isso garante a autoria de cada linha de código inserida na baseline.

5. **Integração Contínua (GitHub Actions)**
   - O pipeline (`.github/workflows/ci.yml`) dispara automaticamente ao abrir ou atualizar um Pull Request, ou ao fazer merges para qualquer branch.
   - O workflow está dividido em quatro **Jobs separados**:
     - `lint`: Verifica o estilo do código.
     - `test`: Executa a suíte de testes e falha se a cobertura for menor que 90%.
     - `build-docker`: Constrói a imagem Docker para validar a integridade da aplicação (Roda em qualquer branch).
     - `publish-docker`: Faz o envio da imagem validada para o Docker Hub (Executa exclusivamente na branch `main`).
   - Apenas com todos os status checks verdes o Pull Request pode ser aprovado.

---

## 📌 Rotas da API

- `GET /api/filmes`: Retorna a lista completa de filmes.
- `POST /api/filmes`: Adiciona um novo filme. O corpo da requisição deve conter o objeto do filme em formato JSON.
- `DELETE /api/filmes/:id`: Remove um filme específico pelo ID. Retorna `204 No Content` em caso de sucesso ou `404 Not Found` caso o ID não exista.