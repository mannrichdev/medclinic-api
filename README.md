# 🏥 MedClinic API

API RESTful para gestão de clínica médica desenvolvida em Node.js e TypeScript, utilizando TypeORM, PostgreSQL, autenticação JWT, controlo de acesso RBAC, documentação Swagger, logs com Winston e segurança de borda (CORS e Rate Limiting).

---

## 🔗 Links Principais

- 🌐 **API em Produção (Render):** https://medclinic-api-cr9k.onrender.com
- 📖 **Documentação Swagger:** https://medclinic-api-cr9k.onrender.com/docs
- 📌 **Quadro Kanban (GitHub Projects / Trello):** [(https://github.com/users/mannrichdev/projects/2/views/1)]
- 📹 **Vídeo Demonstrativo (Google Drive):** [(https://drive.google.com/drive/folders/1jG2yrZsg_Rpov7vmNjuvWzkQGubXrlvf?usp=sharing)]

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Runtime & Framework:** Node.js, Express.js
- **Banco de Dados & ORM:** PostgreSQL, TypeORM
- **Documentação:** Swagger UI (`/docs`)
- **Observabilidade:** Winston Logger
- **Segurança:** CORS, Rate Limiting (`express-rate-limit`), Bcrypt, JWT + RBAC (Administrador / Atendente)
- **Deploy & Infraestrutura:** Render (Web Service + PostgreSQL Managed Database), `render.yaml` (IaC)

---

## 🏗️ Arquitetura do Sistema

O projeto segue a arquitetura em camadas MVC/Clean Code:
- **Routes:** Definição dos endpoints REST.
- **Middlewares:** Autenticação JWT, autorização RBAC, tratamento global de erros, logger e rate limiting.
- **Controllers:** Validação e receção de dados HTTP.
- **Services:** Regras de negócio da clínica (agendamentos, conflito de horários, status).
- **Repositories & Entities:** Mapeamento objeto-relacional e persistência de dados com TypeORM.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- Node.js (v18+)
- PostgreSQL ativo localmente

### 2. Instalação
```bash
# Clonar o repositório
git clone [https://github.com/mannrichdev/medclinic-api.git](https://github.com/mannrichdev/medclinic-api.git)
cd medclinic-api

# Instalar dependências
npm install