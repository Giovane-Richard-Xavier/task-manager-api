<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">🗂️ Task Manager API</h1>

<p align="center">
API REST para gerenciamento de usuários, projetos e tarefas, desenvolvida com foco em boas práticas de arquitetura, validação de dados e organização de código.
</p>

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker & Docker Compose**
- **Class Validator**
- **Bcrypt**
- **TypeScript**

---

## 🧠 Funcionalidades

✔ Cadastro de usuários  
✔ Criptografia de senha  
✔ Paginação de usuários  
✔ CRUD de Projetos  
✔ CRUD de Tarefas  
✔ Relacionamento entre Usuário → Projetos → Tarefas  
✔ Validação de DTOs  
✔ Estrutura modular seguindo padrão do NestJS  

---

## 🏗️ Arquitetura

O projeto segue a arquitetura padrão do NestJS:

```
src/
 ├── modules
 │   ├── user
 │   ├── project
 │   └── task
 ├── prisma
 └── main.ts
```

- Separação por domínio  
- Services responsáveis por regra de negócio  
- Controllers apenas para camada HTTP  
- Prisma isolado em módulo próprio  

---

## ⚙️ Como rodar o projeto

### 🔹 1. Clonar o repositório

```bash
git clone <repo-url>
cd task-manager-api
```

---

### 🔹 2. Criar o arquivo de ambiente

Copie o exemplo:

```bash
cp .env.example .env
```

Ou crie manualmente:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/task_manager?schema=public"
```

---

### 🔹 3. Subir a aplicação com Docker

```bash
docker-compose up --build
```

✅ **Pronto!** A API estará rodando em:

```
http://localhost:3001
```

---

## 🐳 O que o Docker faz automaticamente

Ao subir o container, o projeto já executa:

- Instalação de dependências  
- Geração do Prisma Client  
- Execução das migrations  
- Build da aplicação  
- Inicialização do servidor NestJS  

👉 Ambiente totalmente reprodutível.

---

## 🛠️ Rodar comandos dentro do container (opcional)

Caso precise acessar o container:

```bash
docker exec -it task_manager_app bash
```

---

## 📦 Principais Endpoints

### 👤 Usuários

| Método | Rota | Descrição |
|-------|------|-----------|
| POST | `/users` | Criar usuário |
| GET | `/users` | Listar usuários com paginação |
| GET | `/users/:id` | Busca usuários pelo id |
| DELETE | `/users/:id` | Remove usuário, desde que não tenha projetos vinculados|

---

### 📁 Projetos

| Método | Rota | Descrição |
|-------|------|-----------|
| POST | `/projects` | Criar projeto |
| GET | `/projects` | Listar projetos com paginação |
| GET | `/projects/:id` | Busca projetos pelo id |
| GET | `/users/:userId/projects` | Listar projetos pelo id do usuário |
| DELETE | `/projects/:id` | Remove projeto, desde que não tenha tarefas vinculadas |

---

### ✅ Tarefas

| Método | Rota | Descrição |
|-------|------|-----------|
| POST | `/tasks` | Criar tarefa |
| GET | `/tasks` | Listar tarefas com paginação |
| GET | `/projects/:projectId/tasks` | Listar tarefas pelo id do projeto |
| PATCH | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Remover tarefa |

---

## 🔐 Segurança

- Senhas criptografadas com **bcrypt**
- DTOs validados com **class-validator**
- Dados sensíveis não retornados nas respostas

---

## 🧪 Futuras melhorias

- Autenticação com JWT  
- Autorização por usuário  
- Testes unitários  
- Logs estruturados  
- Deploy em cloud  

---

## 📄 Licença

Este projeto está sob a licença MIT.
