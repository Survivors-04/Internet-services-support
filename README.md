# Internet Services Support

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Este é um projeto back-end de uma aplicação que da suporte aos clientes de uma fornecedora de internet, tendo em sua estrutura o foco nos atendimentos e organização da sua equipe de colaboradores.

Logo abaixo temos a lista de tecnologias usadas:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [uuid](https://www.npmjs.com/package/uuid)
- [pg](https://www.npmjs.com/package/pg)
- [Metadata Reflection API](https://www.npmjs.com/package/reflect-metadata)

Tecnologias usadas para criação dos testes de integração:

- [Jest](https://jestjs.io/docs/getting-started)
- [Supertest](https://www.npmjs.com/package/supertest)
- [SQLite3](https://www.npmjs.com/package/sqlite3)
- [TS-Jest](https://www.npmjs.com/package/ts-jest)
- [Cross-Env](https://www.npmjs.com/package/cross-env)

URL base da aplicação: https://internet-services-support.herokuapp.com/

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API com suas relações entre as tabelas do banco de dados:

<img src="./src/utils/img/DER.png" height="600px">

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

A autenticação dessa aplicação é feita através de:

```
Authorization: Bearer Token
```

Todas rotas pedem que um Bearer Token seja passado com exceção dessas duas:

| Método | Rota                                            | Descrição                                      |
| ------ | ----------------------------------------------- | ---------------------------------------------- |
| POST   | [/login](#11-criação-do-token-através-do-login) | Gerando token de acesso as rotas da aplicação. |
| POST   | [/clients](#21-criação-do-cliente)              | Criação de um cliente.                         |

Exemplo de header de uma request:

```
PATCH /client
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSIsInJvbGUiOjQsImlzX2FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjY3OTIyNjk3LCJleHAiOjE2NjgwMDkwOTcsInN1YiI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSJ9.2xjH9Er8aUpMxElxwBrTsEej6UpK301hfrc8XUpogrY
Content-type: application/json
```

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

```
Base URL: https://internet-services-support.herokuapp.com/
```

### Índice

- [Login](#1-login)
  - [POST - /login](#11-criação-do-token-através-do-login)
- [Clients](#2-clients)
  - [POST - /clients](#21-criação-do-cliente)
  - [GET - /clients](#22-listando-clientes)
  - [GET - /clients/:id](#23-listar-cliente-por-id)
  - [PATCH - /clients/:id](#24-atualizando-dados-do-cliente)
  - [DELETE - /clients/:id](#25-listar-usuário-por-id)
  - [POST - /clients/:id/plans](#26-criação-de-usuário)
  - [DELETE - /clients/:id/plans](#27-listar-usuário-por-id)
- [Products](#3-products)
- [Cart](#4-cart)
- [Users](#5-buys)

---

## 1. **Login**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto login é definido como:

| Campo    | Tipo   | Descrição                    |
| -------- | ------ | ---------------------------- |
| email    | string | O e-mail do usuário.         |
| password | string | A senha de acesso do usuário |

### Endpoints

| Método | Rota   | Descrição                                      |
| ------ | ------ | ---------------------------------------------- |
| POST   | /login | Gerando token de acesso as rotas da aplicação. |

---

### 1.1. **Criação do token através do login**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:

```
POST /login
Host: https://internet-services-support.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "client@mail.com",
  "password": "client123"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSIsInJvbGUiOjQsImlzX2FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjY3OTIyNjk3LCJleHAiOjE2NjgwMDkwOTcsInN1YiI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSJ9.2xjH9Er8aUpMxElxwBrTsEej6UpK301hfrc8XUpogrY"
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 403 Forbidden  | Wrong email/password. |
| 403 Forbidden  | User not Active.      |

---

## 2. **Clients**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Client é definido como:

| Campo        | Tipo    | Descrição                                       |
| ------------ | ------- | ----------------------------------------------- |
| id           | string  | Identificador único do usuário                  |
| name         | string  | O nome do usuário.                              |
| cpf          | string  | O CPF do usuário.                               |
| telephone    | string  | O telefone do usuário.                          |
| email        | string  | O e-mail do usuário.                            |
| password     | string  | A senha de acesso do usuário                    |
| is_active    | boolean | Define se a conta do cliente está ativa ou não. |
| created-date | date    | A data que a conta foi criada.                  |
| updated-date | date    | A ultima data que a conta foi atualizada.       |

### Endpoints

| Método | Rota               | Descrição                                                                             |
| ------ | ------------------ | ------------------------------------------------------------------------------------- |
| POST   | /clients           | Criação de um cliente.                                                                |
| GET    | /clients           | Lista todos os clientes.                                                              |
| GET    | /clients/:id       | Lista um cliente usando seu ID como parâmetro.                                        |
| PATCH  | /clients/:id       | Atualiza um cliente usando seu ID como parâmetro.                                     |
| DELETE | /clients/:id       | Deleta um cliente usando seu ID como parâmetro .                                      |
| POST   | /clients/:id/plans | Adiciona um plano de internet a conta do cliente usando o ID do mesmo como parâmetro. |
| DELETE | /clients/:id/plans | Remove um plano de internet da conta do cliente usando o ID do mesmo como parâmetro.  |

---

### 2.1. **Criação do Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
POST /clients
Host: https://internet-services-support.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "client",
  "cpf": "12345679801",
  "telephone": "13982651234",
  "email": "client@mail.com",
  "password": "client123"
}
```

### Schema de Validação com Yup:

```javascript
  id: yup
    .string()
    .transform(() => uuidv4())
    .default(() => uuidv4())
    .notRequired(),
  name: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().required(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .required(),
  telephone: yup.string().required(),
  created_date: yup
    .date()
    .default(() => new Date())
    .transform(() => new Date())
    .notRequired(),
  updated_date: yup
    .date()
    .default(() => new Date())
    .transform(() => new Date())
    .notRequired(),
  is_active: yup
    .boolean()
    .default(() => true)
    .transform(() => true)
    .notRequired(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "data": {
    "id": "72c9fab0-7fb4-4276-9099-42b90761e8d6",
    "name": "EnriqueBds",
    "cpf": "12345679801",
    "telephone": "13982651234",
    "email": "enrique@mail.com",
    "is_active": true,
    "created_date": "2022-11-08T16:27:27.971Z",
    "updated_date": "2022-11-08T16:27:27.971Z"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                 |
| --------------- | ------------------------- |
| 400 Bad Request | Email already being used. |

---

### 2.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:

```
GET /clients
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "data": [
    {
      "id": "7779447f-bbbd-43d7-af5b-07362027e1e7",
      "name": "felipe",
      "cpf": "56944459800",
      "telephone": "11959267759",
      "email": "felipe.silva@gmail.com",
      "is_active": true,
      "created_date": "2022-11-04T14:53:03.244Z",
      "updated_date": "2022-11-04T14:53:03.244Z",
      "client_plan": []
    },
    {
      "id": "bf46bd5a-a24c-4415-8e88-4ab5ba3a7607",
      "name": "Kenzinho",
      "cpf": "56968459800",
      "telephone": "11959267759",
      "email": "kenzinho.@gmail.com",
      "is_active": true,
      "created_date": "2022-11-04T18:26:56.787Z",
      "updated_date": "2022-11-04T18:26:56.787Z",
      "client_plan": []
    },
    {
      "id": "81a4090e-4a15-4d0e-befb-1c0606f34f17",
      "name": "Patin da Kenzie",
      "cpf": "56944459800",
      "telephone": "11959267759",
      "email": "patindakenzie.@gmail.com",
      "is_active": true,
      "created_date": "2022-11-04T16:50:29.294Z",
      "updated_date": "2022-11-04T16:50:29.294Z",
      "client_plan": []
    }
  ]
}
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
GET /clients/81a4090e-4a15-4d0e-befb-1c0606f34f17
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do cliente (Cliente) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "data": {
    "id": "7779447f-bbbd-43d7-af5b-07362027e1e7",
    "name": "felipe",
    "cpf": "56944459800",
    "telephone": "11959267759",
    "email": "felipe.silva@gmail.com",
    "is_active": true,
    "created_date": "2022-11-04T14:53:03.244Z",
    "updated_date": "2022-11-04T14:53:03.244Z",
    "client_plan": []
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                       |
| ---------------- | ----------------------------------------------- |
| 401 Unauthorized | Invalid token.                                  |
| 403 Forbidden    | The client is not allowed to access this route. |
| 404 Not found    | Invalid client Id.                              |

### 2.4. **Atualizando dados do cliente**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
PATCH /clients
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do cliente (Cliente) |

### Corpo da Requisição:

```json
{
  "telephone": "11959359843",
  "email": "kenzinho@kenzie.com"
}
```

### Schema de Validação com Yup:

```javascript
  email: yup.string().notRequired(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .notRequired(),
  telephone: yup.string().notRequired(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "data": {
    "message": "Client updated",
    "client": {
      "id": "72c9fab0-7fb4-4276-9099-42b90761e8d6",
      "name": "EnriqueBds",
      "cpf": "12345679801",
      "telephone": "11959359843",
      "email": "kenzinho@kenzie.com",
      "is_active": true,
      "created_date": "2022-11-08T16:27:27.971Z",
      "updated_date": "2022-11-08T19:25:23.277Z",
      "client_plan": []
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                       |
| ---------------- | ----------------------------------------------- |
| 401 Unauthorized | Invalid token.                                  |
| 403 Forbidden    | The client is not allowed to access this route. |
| 404 Not found    | Client not found.                               |

---

### 2.4. **Atualizando dados do cliente**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
PATCH /clients
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do cliente (Cliente) |

### Corpo da Requisição:

```json
{
  "telephone": "11959359843",
  "email": "kenzinho@kenzie.com"
}
```

### Schema de Validação com Yup:

```javascript
  email: yup.string().notRequired(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .notRequired(),
  telephone: yup.string().notRequired(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "data": {
    "message": "Client updated",
    "client": {
      "id": "72c9fab0-7fb4-4276-9099-42b90761e8d6",
      "name": "EnriqueBds",
      "cpf": "12345679801",
      "telephone": "11959359843",
      "email": "kenzinho@kenzie.com",
      "is_active": true,
      "created_date": "2022-11-08T16:27:27.971Z",
      "updated_date": "2022-11-08T19:25:23.277Z",
      "client_plan": []
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                       |
| ---------------- | ----------------------------------------------- |
| 401 Unauthorized | Invalid token.                                  |
| 403 Forbidden    | The client is not allowed to access this route. |
| 404 Not found    | Client not found.                               |

---
