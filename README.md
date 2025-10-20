# API Back-End - Dashboard Financeiro (MERN)

Esta é a API RESTful para o projeto Dashboard Financeiro, responsável por toda a lógica de negócios e comunicação com o banco de dados.

Construída com **Node.js** e **Express**, ela se conecta a um banco **MongoDB Atlas** (usando Mongoose) para gerenciar as transações.

### Funcionalidades da API

- **POST /api/transactions**: Cria uma nova transação (entrada ou saída).
- **GET /api/transactions**: Lista todas as transações do banco.
- **DELETE /api/transactions/:id**: Deleta uma transação específica pelo seu ID.

### Segurança

- As credenciais do banco de dados são protegidas usando variáveis de ambiente (`.env`).
- A API permite requisições de qualquer origem (CORS) para ser consumida pelo front-end.

---

**Front-End (React) deste projeto:**
[https://github.com/RonaldoCodigos/dashboard-frontend](https://github.com/RonaldoCodigos/dashboard-frontend)
