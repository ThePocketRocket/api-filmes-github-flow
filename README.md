# API de Filmes

Uma API RESTful simples desenvolvida em Node.js com Express para o gerenciamento de filmes, criada como projeto prático para a disciplina de Gestão de Configuração e Qualidade de Código.

## 🚀 Como executar e testar (Localmente)

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

---

## 🐳 Infraestrutura com Vagrant e Ansible

O projeto contém um ambiente virtualizado automatizado utilizando Vagrant e Ansible, executando duas máquinas virtuais.

### 1. Iniciar as Máquinas Virtuais
No terminal, na raiz do projeto (onde está o `Vagrantfile`), execute:
```bash
vagrant up
```
*Este comando criará as VMs (VM1 e VM2). A VM1 será configurada como Nó de Controle, recebendo a instalação automática do Ansible. A VM2 será o Nó Gerenciado e terá a autenticação por senha liberada para acesso remoto via SSH.*

### 2. Executar o Provisionamento (Ansible)
Abra um terminal e acesse a VM1 via SSH:
```bash
vagrant ssh vm1
```
Dentro da VM1, navegue até a pasta sincronizada do projeto e execute o Playbook do Ansible:
```bash
cd /vagrant
ansible-playbook configura-node.yaml
```
*O Ansible irá se conectar à VM2 (IP: `192.168.56.20`), instalar dependências básicas, configurar o Node.js, clonar o código fonte da aplicação e instalar todas as dependências do projeto de forma 100% automatizada.*

### 3. Rodar o Backend na VM2
Após o Ansible finalizar com sucesso, abra um novo terminal, acesse a VM2 e inicie o servidor da API:
```bash
vagrant ssh vm2
cd /home/vagrant/app
node index.js
```
*A API agora estará rodando internamente na VM2.*

### 4. Testar a comunicação a partir da VM1
Com a API rodando na VM2, volte para a janela do terminal da VM1 e utilize o `curl` para testar a rota GET do backend:
```bash
curl http://192.168.56.20:8080/api/filmes
```
*Se a comunicação estiver correta, você verá o JSON com a lista de filmes ser impresso no console da VM1!*

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
   - O pipeline (`.github/workflows/ci.yml`) dispara automaticamente ao abrir ou atualizar um Pull Request para a `main`.
   - O workflow está dividido em dois **Jobs separados**:
     - `lint`: Verifica o estilo do código.
     - `test`: Executa a suíte de testes e falha se a cobertura for menor que 90%.
   - Apenas com todos os status checks verdes o Pull Request pode ser aprovado.

---

## 📌 Rotas da API

- `GET /api/filmes`: Retorna a lista completa de filmes.
- `POST /api/filmes`: Adiciona um novo filme. O corpo da requisição deve conter o objeto do filme em formato JSON.
- `DELETE /api/filmes/:id`: Remove um filme específico pelo ID. Retorna `204 No Content` em caso de sucesso ou `404 Not Found` caso o ID não exista.