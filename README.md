# 🚀 Task Manager API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
API RESTful para gerenciamento de <strong>Usuários, Projetos e Tarefas</strong>, construída com <strong>NestJS</strong>, <strong>Prisma ORM</strong> e <strong>PostgreSQL</strong>, totalmente preparada para rodar com <strong>Docker</strong>.
</p>

---

## 📌 Sobre o Projeto

Esta API foi desenvolvida com foco em boas práticas de backend, arquitetura modular e organização de código, simulando um ambiente real de desenvolvimento para entrevistas técnicas.

### O sistema permite:

- Gerenciar **usuários**
- Criar **projetos**
- Criar e gerenciar **tarefas**
- Relacionamento entre usuários → projetos → tarefas
- Paginação de dados
- Validações de entrada
- Hash seguro de senhas

---

## 🧱 Tecnologias Utilizadas

| Tecnologia | Função |
|-----------|--------|
| **NestJS** | Framework backend |
| **Prisma** | ORM e acesso ao banco |
| **PostgreSQL** | Banco de dados |
| **Docker** | Containerização |
| **TypeScript** | Linguagem |
| **bcrypt** | Hash de senha |
| **class-validator** | Validação de DTOs |

---

## 📂 Entidades do Sistema

### 👤 User
| Campo | Tipo |
|------|------|
| id | string |
| name | string |
| email | string |
| password | string (hash) |
| createdAt | Date |

---

### 📁 Project
| Campo | Tipo |
|------|------|
| id | string |
| name | string |
| userId | string |

---

### ✅ Task
| Campo | Tipo |
|------|------|
| id | string |
| title | string |
| description | string |
| status | ENUM |
| dueDate | Date |
| projectId | string |

---

## ⚙️ Como rodar o projeto

### 🔹 1. Clonar o repositório

```bash
git clone <repo-url>
cd task-manager-api
docker-compose up --build



