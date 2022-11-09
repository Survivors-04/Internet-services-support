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
| GET    | [/plans](#32-listando-planos-de-internet)       | Listando os planos de internet.                |

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
  - [PATCH - /clients/:id](#24-atualizando-cliente-pelo-id)
  - [DELETE - /clients/:id](#25-deletando-o-cliente-pelo-id)
  - [POST - /clients/:id/plans](#26-adicionando-plano-de-internet-ao-cliente)
  - [DELETE - /clients/:id/plans](#27-removendo-plano-de-internet-do-cliente)
- [Internet_plan](#3-internet-plan)
  - [POST - /plans](#31-criação-do-plano-de-internet)
  - [GET - /plans](#32-listando-planos-de-internet)
  - [GET - /plans/:id/clients](#33-listando-planos-ativos-por-id)
  - [PATCH - /plans/:id](#34-atualizando-plano-de-internet-pelo-id)
  - [DELETE - /plans/:id](#35-deletando-plano-de-internet-pelo-id)
- [Collaborators](#4-collaborators)
  - [POST - /collaborators](#41-criação-do-colaborador)
  - [GET - /collaborators](#42-listando-colaboradores)
  - [GET - /collaborators/:id](#43-listando-colaborador-pelo-id)
  - [PATCH - /collaborators/:id](#44-atualizando-colaborador-pelo-id)
  - [DELETE - /collaborators/:id](#45-deletando-colaborador-pelo-id)
- [Supervisors](#5-supervisors)
  - [POST - /supervisors](#51-criação-do-supervisor)
  - [GET - /supervisors](#52-listando-supervisores)
  - [PATCH - /supervisors/:id](#53-atualizando-supervisor-pelo-id)
  - [DELETE - /supervisors/:id](#54-deletando-supervisor-pelo-id)
- [Teams](#6-Teams)
  - [POST - /teams](#61-criação-do-time)
  - [GET - /teams](#62-listando-times)
  - [GET - /teams/:id](#63-listando-time-pelo-id)
  - [GET - /teams/supervisor/:id](#64-listano-time-pelo-id-do-supervisor)
  - [DELETE - /teams/:id](#65-deletando-time-pelo-id)
  - [POST - /teams/:id/collaborator](#66-adicionando-colaborador-ao-time)
  - [DELETE - /teams/:id/collaborator](#67-removendo-colaborador-do-time)
- [Services](#7-Services)
  - [POST - /services](#71-criação-do-serviço)
  - [GET - /services](#72-listando-serviços)
  - [PATCH - /services/:id](#73-atualizando-serviço-pelo-id)
  - [DELETE - /services/:id](#74-deletando-serviço-pelo-id)
- [Attendances](#8-Attendances)
  - [POST - /attendances](#81-criação-do-atendimento)
  - [GET - /attendances](#82-listando-atendimentos)
  - [GET - /attendances/:id](#83-listando-atendimento-pelo-id)
  - [GET - /attendances/collaborators/:id](#84-listando-atendimentos-feitos-por-colaborador-pelo-id)
  - [DELETE - /attendances/:id](#85-deletando-atendimento-pelo-id)

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSIsInJvbGUiOjQsImlzX2FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNjY3OTIyNjk3LCJleHAiOjE2NjgwMDkwOTcsInN1YiI6IjU4ZmEzODYwLTBjYTctNDMyOS1iYWJkLWQ3MjhkY2RmZTA5YSJ9.2xjH9Er8aUpMxElxwBrTsEej6UpK301hfrc8XUpogrY"
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
| id           | string  | Identificador único do cliente.                 |
| name         | string  | O nome do cliente.                              |
| cpf          | string  | O CPF do cliente.                               |
| telephone    | string  | O telefone do cliente.                          |
| email        | string  | O e-mail do cliente.                            |
| password     | string  | A senha de acesso do cliente                    |
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
  "id": "72c9fab0-7fb4-4276-9099-42b90761e8d6",
  "name": "EnriqueBds",
  "cpf": "12345679801",
  "telephone": "13982651234",
  "email": "enrique@mail.com",
  "is_active": true,
  "created_date": "2022-11-08T16:27:27.971Z",
  "updated_date": "2022-11-08T16:27:27.971Z"
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
[
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
```

### Possíveis Erros:

| Código do Erro | Descrição                                       |
| -------------- | ----------------------------------------------- |
| 403 Forbidden  | Invalid token.                                  |
| 403 Forbidden  | The client is not allowed to access this route. |

---

### 2.3. **Listar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
GET /clients/:id
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
```

### Possíveis Erros:

| Código do Erro | Descrição                         |
| -------------- | --------------------------------- |
| 403 Forbidden  | Invalid token.                    |
| 403 Forbidden  | User must be atleast Colaborator. |
| 404 Not found  | Invalid client Id.                |

---

### 2.4. **Atualizando cliente pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
PATCH /clients/:id
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
```

### Possíveis Erros:

| Código do Erro | Descrição                                       |
| -------------- | ----------------------------------------------- |
| 403 Forbidden  | Invalid token.                                  |
| 403 Forbidden  | The client is not allowed to access this route. |
| 404 Not found  | Client not found.                               |

---

### 2.5. **Deletando o cliente pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
DELETE /clients/:id
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
vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "Client deleted"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                              |
| --------------- | ------------------------------------------------------ |
| 403 Forbidden   | Invalid token.                                         |
| 403 Forbidden   | Only collaborators or superiors can access this route. |
| 404 Not found   | Client not found. This account is disabled             |
| 400 Bad request | This account is disabled.                              |

---

### 2.6. **Adicionando plano de internet ao cliente**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id/plans`

### Exemplo de Request:

```
POST /clients/:id/plans
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
  "internet_plan_id": "beb2a0c3-c16d-412e-a8fd-d0317b8c2189"
}
```

### Schema de Validação com Yup:

```javascript
internet_plan_id: yup.string().required();
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "message": "Plan added to the client"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                              |
| --------------- | ------------------------------------------------------ |
| 403 Forbidden   | Invalid token.                                         |
| 403 Forbidden   | Only collaborators or superiors can access this route. |
| 404 Not found   | Client not found.                                      |
| 404 Not found   | Internet plan not found.                               |
| 400 Bad request | The customer already has this plan.                    |

---

### 2.7. **Removendo plano de internet do cliente**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id/plans`

### Exemplo de Request:

```
DELETE /clients/:id/plans
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
  "internet_plan_id": "beb2a0c3-c16d-412e-a8fd-d0317b8c2189"
}
```

### Schema de Validação com Yup:

```javascript
internet_plan_id: yup.string().required();
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "Client plan deleted"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                              |
| -------------- | ------------------------------------------------------ |
| 403 Forbidden  | Invalid token.                                         |
| 403 Forbidden  | Only collaborators or superiors can access this route. |
| 404 Not found  | Client or internet plan not found.                     |

---

## 3. **Internet_plan**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Internet_plan é definido como:

| Campo       | Tipo   | Descrição                    |
| ----------- | ------ | ---------------------------- |
| id          | string | Identificador único do plano |
| name        | string | O nome do plano.             |
| description | string | A descrição do plano.        |
| price       | number | O preço do plano.            |

### Endpoints

| Método | Rota               | Descrição                                                  |
| ------ | ------------------ | ---------------------------------------------------------- |
| POST   | /plans             | Criação de um plano de internet.                           |
| GET    | /plans             | Lista todos os planos.                                     |
| GET    | /plans/:id/clients | Lista pelo ID do plano todos os planos ativos com o mesmo. |
| PATCH  | /plans/:id         | Atualiza um plano usando seu ID como parâmetro.            |
| DELETE | /plans/:id         | Deleta um plano usando seu ID como parâmetro .             |

---

### 3.1. **Criação do plano de internet**

[ Voltar para os Endpoints ](#5-endpoints)

### `/plans`

### Exemplo de Request:

```
POST /plans
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Plan",
  "description": "Description",
  "price": 120
}
```

### Schema de Validação com Yup:

```javascript
  id: yup
      .string()
      .default(() => uuidv4())
      .transform(() => uuidv4())
      .notRequired(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "59951149-d355-43ce-b080-0bf7b58b2f4c",
  "name": "Plan",
  "description": "Description",
  "price": 120
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                 |
| --------------- | ----------------------------------------- |
| 403 Forbidden   | Invalid token.                            |
| 403 Forbidden   | access only for supervisors and managers. |
| 400 Bad request | internet plan already registered.         |

---

### 3.2. **Listando planos de internet**

[ Voltar para os Endpoints ](#5-endpoints)

### `/plans`

### Exemplo de Request:

```
GET /plans
Host: https://internet-services-support.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "3e85450b-a9ac-4e25-93bb-9293dd497d6d",
    "name": "nome exemplo",
    "description": "internet 16gb cada um",
    "price": "150"
  },
  {
    "id": "beb2a0c3-c16d-412e-a8fd-d0317b8c2189",
    "name": "nome exemplo",
    "description": "internet 16gb cada um",
    "price": "150"
  },
  {
    "id": "23f0c1ce-1d2a-4dfd-9c1e-955d15fc3a30",
    "name": "nome exemplo",
    "description": "internet 16gb cada um",
    "price": "150"
  },
  {
    "id": "73342526-064e-462e-832f-2d1fd556db54",
    "name": "nome exemplo",
    "description": "internet 16gb cada um",
    "price": "150"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 3.3. **Listando planos ativos por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/plans/:id/clients`

### Exemplo de Request:

```
GET /plans/:id/clients
Host: https://internet-services-support.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                    |
| --------- | ------ | -------------------------------------------- |
| id        | string | Identificador único do plano (Internet_plan) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "72c9fab0-7fb4-4276-9099-42b90761e8d6",
    "name": "EnriqueBds",
    "cpf": "12345679801",
    "telephone": "13982651234",
    "email": "enrique@mail.com",
    "is_active": true,
    "created_date": "2022-11-08T16:27:27.971Z",
    "updated_date": "2022-11-08T16:27:27.971Z",
    "client_plan": [
      {
        "id": "38f492bd-9311-480d-87ce-bfdcfb0309a8",
        "internet_plan": {
          "id": "23f0c1ce-1d2a-4dfd-9c1e-955d15fc3a30",
          "name": "testando",
          "description": "internet 16gb cada um",
          "price": "150"
        }
      }
    ]
  },
  {
    "id": "7779447f-bbbd-43d7-af5b-07362027e1e7",
    "name": "edmar",
    "cpf": "56944459800",
    "telephone": "11555511111",
    "email": "edmar.silva@gmail.com",
    "is_active": true,
    "created_date": "2022-11-04T14:53:03.244Z",
    "updated_date": "2022-11-04T14:53:03.244Z",
    "client_plan": [
      {
        "id": "38f492bd-9311-480d-87ce-bfdcfb0309a8",
        "internet_plan": {
          "id": "23f0c1ce-1d2a-4dfd-9c1e-955d15fc3a30",
          "name": "testando",
          "description": "internet 16gb cada um",
          "price": "150"
        }
      }
    ]
  }
]
```

### Observações:

Talvez esse retorno pareça confuso por causa da key client_plan, mas essa é a tabela que guarda os planos ativos em cada cliente. Você pode conferir isso no [DER](#2-diagrama-er) apresentado no início da documentação.

### Possíveis Erros:

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 403 Forbidden  | Invalid token.           |
| 403 Forbidden  | Unauthorized.            |
| 404 Conflict   | internet plan not found. |

---

### 3.4. **Atualizando plano de internet pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/plans/:id`

### Exemplo de Request:

```
PATCH /plans/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                    |
| --------- | ------ | -------------------------------------------- |
| id        | string | Identificador único do plano (Internet_plan) |

### Corpo da Requisição:

```json
{
  "name": "Plano de celular",
  "description": "plano de 8gb",
  "price": 75
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
  price: yup.number().notRequired(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "beb2a0c3-c16d-412e-a8fd-d0317b8c2189",
  "name": "Plano de celular",
  "description": "plano de 8gb",
  "price": "40"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Invalid token.                            |
| 403 Forbidden  | access only for supervisors and managers. |
| 404 Not found  | internet plan not found.                  |

---

### 3.5. **Deletando plano de internet pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/plans/:id`

### Exemplo de Request:

```
DELETE /plans/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                    |
| --------- | ------ | -------------------------------------------- |
| id        | string | Identificador único do plano (Internet_plan) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "internet plan deleted successfully"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Invalid token.                            |
| 403 Forbidden  | access only for supervisors and managers. |
| 404 Not found  | internet plan not found.                  |

---

## 4. **Collaborators**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Collaborator é definido como:

| Campo     | Tipo    | Descrição                                           |
| --------- | ------- | --------------------------------------------------- |
| id        | string  | Identificador único do colaborador.                 |
| name      | string  | O nome do colaborador.                              |
| cpf       | string  | O CPF do colaborador.                               |
| telephone | string  | O telefone do colaborador.                          |
| email     | string  | O e-mail do colaborador.                            |
| password  | string  | A senha de acesso do colaborador.                   |
| is_active | boolean | Define se a conta do colaborador está ativa ou não. |

### Endpoints

| Método | Rota               | Descrição                                             |
| ------ | ------------------ | ----------------------------------------------------- |
| POST   | /collaborators     | Criação de um colaborador.                            |
| GET    | /collaborators     | Lista todos os colaboradores.                         |
| GET    | /collaborators/:id | Lista um colaborador usando seu ID como parâmetro.    |
| PATCH  | /collaborators/:id | Atualiza um colaborador usando seu ID como parâmetro. |
| DELETE | /collaborators/:id | Deleta um colaborador usando seu ID como parâmetro .  |

---

### 4.1. **Criação do colaborador**

[ Voltar para os Endpoints ](#5-endpoints)

### `/collaborators`

### Exemplo de Request:

```
POST /collaborators
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Teste",
  "email": "teste50@mail.com",
  "password": "Teste123",
  "cpf": "12345678921",
  "telephone": "13984512783"
}
```

### Schema de Validação com Yup:

```javascript
  id: yup
    .string()
    .default(() => uuidv4())
    .transform(() => uuidv4())
    .notRequired(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .transform((pws) => hashSync(pws, 10))
    .required(),
  cpf: yup.string().required(),
  telephone: yup.string().required(),
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
  "id": "4b8d69de-26ce-4f33-8460-c4dcca8e0d04",
  "name": "Teste",
  "cpf": "12345678921",
  "telephone": "13984512783",
  "email": "teste50@mail.com",
  "is_active": true
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                 |
| --------------- | ----------------------------------------- |
| 403 Forbidden   | Invalid token.                            |
| 403 Forbidden   | access only for supervisors and managers. |
| 400 Bad Request | CPF or Email already registered!          |

---

### 4.2. **Listando colaboradores**

[ Voltar para os Endpoints ](#5-endpoints)

### `/collaborators`

### Exemplo de Request:

```
GET /collaborators
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "7921829e-a949-4e74-9abf-601ee439eef2",
    "name": "testando",
    "is_active": true,
    "cpf": "52933337800",
    "telephone": "1956151",
    "email": "testandogmail.com"
  },
  {
    "id": "4b8d69de-26ce-4f33-8460-c4dcca8e0d04",
    "name": "Teste",
    "is_active": true,
    "cpf": "12345678921",
    "telephone": "13984512783",
    "email": "teste50@mail.com"
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Invalid token.                            |
| 403 Forbidden  | access only for supervisors and managers. |

---

### 4.3. **Listando colaborador pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients/:id`

### Exemplo de Request:

```
GET /collaborators/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                         |
| --------- | ------ | ------------------------------------------------- |
| id        | string | Identificador único do colaborator (Collaborator) |

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
  "id": "a6822e4c-31ad-4b10-acf3-8d41c967a556",
  "name": "Roberto",
  "is_active": true,
  "cpf": "06858288782",
  "telephone": "995397895",
  "email": "ed2017@gmail.com"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Invalid token.                            |
| 403 Forbidden  | access only for supervisors and managers. |
| 404 Not found  | Invalid id!.                              |

---

### 4.4. **Atualizando colaborador pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/collaborators/:id`

### Exemplo de Request:

```
PATCH /collaborators/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                         |
| --------- | ------ | ------------------------------------------------- |
| id        | string | Identificador único do colaborador (Collaborator) |

### Corpo da Requisição:

```json
{
  "name": "bob",
  "telephone": "1956151",
  "email": "testandogmail.com",
  "password": "1234"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
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
  "id": "7921829e-a949-4e74-9abf-601ee439eef2",
  "name": "bob",
  "is_active": true,
  "cpf": "52933337890",
  "telephone": "1956151",
  "email": "testandogmail.com"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                          |
| ---------------- | -------------------------------------------------- |
| 403 Forbidden    | Invalid token.                                     |
| 403 Forbidden    | access only for supervisors and managers.          |
| 404 Not found    | Collaborator id not found!                         |
| 401 Unauthorized | Cannot edit id, is_active or is_supervisor values! |

---

### 4.5. **Deletando colaborador pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/collaborators/:id`

### Exemplo de Request:

```
DELETE /collaborators/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                         |
| --------- | ------ | ------------------------------------------------- |
| id        | string | Identificador único do colaborador (Collaborator) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "Collaborator deleted"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                 |
| --------------- | ----------------------------------------- |
| 403 Forbidden   | Invalid token.                            |
| 403 Forbidden   | access only for supervisors and managers. |
| 400 Bad request | Collaborator already inative.             |
| 404 Not found   | Collaborator id not found!.               |

---

## 5. **Supervisors**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Supervisor é definido como:

| Campo      | Tipo    | Descrição                                    |
| ---------- | ------- | -------------------------------------------- |
| id         | string  | Identificador único do supervisor.           |
| name       | string  | O nome do supervisor.                        |
| cpf        | string  | O CPF do supervisor.                         |
| telephone  | string  | O telefone do supervisor.                    |
| email      | string  | O e-mail do supervisor.                      |
| password   | string  | A senha de acesso do supervisor.             |
| is_manager | boolean | Define se o supervisor é um gerente ou não . |

### Endpoints

| Método | Rota             | Descrição                                            |
| ------ | ---------------- | ---------------------------------------------------- |
| POST   | /supervisors     | Criação de um supervisor.                            |
| GET    | /supervisors     | Lista todos os supervisores.                         |
| PATCH  | /supervisors/:id | Atualiza um supervisor usando seu ID como parâmetro. |
| DELETE | /supervisors/:id | Deleta um supervisor usando seu ID como parâmetro .  |

---

### 5.1. **Criação do supervisor**

[ Voltar para os Endpoints ](#5-endpoints)

### `/supervisors`

### Exemplo de Request:

```
POST /supervisors
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Mario",
  "email": "mario@mail.com",
  "password": "Manager123",
  "cpf": "12345678901",
  "telephone": "13984512783",
  "is_manager": true
}
```

### Schema de Validação com Yup:

```javascript
  id: yup
      .string()
      .default(() => uuidv4())
      .transform(() => uuidv4())
      .notRequired(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .transform((pws) => hashSync(pws, 10))
      .required(),
    cpf: yup.string().required(),
    telephone: yup.string().required(),
    is_active: yup
      .boolean()
      .default(() => true)
      .transform(() => true)
      .notRequired(),
    is_manager: yup.boolean().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "74bf3912-40da-4390-9ea6-cf9e5ab0b24f",
  "name": "Mario",
  "telephone": "13984512783",
  "email": "mario@mail.com",
  "is_manager": true,
  "is_active": true
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                 |
| --------------- | ----------------------------------------- |
| 403 Forbidden   | Invalid token.                            |
| 403 Forbidden   | access only for supervisors and managers. |
| 400 Bad Request | Email Already exists!                     |

---

### 5.2. **Listando supervisores**

[ Voltar para os Endpoints ](#5-endpoints)

### `/supervisors`

### Exemplo de Request:

```
GET /supervisors
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "cdb982e9-0b05-4ab2-b642-c7c8d4985d83",
    "name": "Manager",
    "telephone": "13984512783",
    "email": "manager@mail.com",
    "is_manager": true,
    "is_active": false
  },
  {
    "id": "74bf3912-40da-4390-9ea6-cf9e5ab0b24f",
    "name": "Mario",
    "telephone": "13984512783",
    "email": "mario@mail.com",
    "is_manager": true,
    "is_active": true
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 403 Forbidden  | Invalid token.        |
| 403 Forbidden  | access only managers. |

---

### 5.3. **Atualizando supervisor pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/supervisors/:id`

### Exemplo de Request:

```
PATCH /supervisors/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                      |
| --------- | ------ | ---------------------------------------------- |
| id        | string | Identificador único do supervisor (Supervisor) |

### Corpo da Requisição:

```json
{
  "name": "bob",
  "telephone": "1956151",
  "email": "testandogmail.com",
  "password": "1234"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
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
  "id": "7b1ca044-2f40-4042-bae6-4471067e0ec1",
  "name": "Sonic Bolado",
  "telephone": "13984512783",
  "email": "soniczinho@gmail.com",
  "is_manager": true,
  "is_active": true
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                       |
| ---------------- | ----------------------------------------------- |
| 403 Forbidden    | Invalid token.                                  |
| 403 Forbidden    | access only managers.                           |
| 404 Not found    | Supervisor not found                            |
| 401 Unauthorized | Cannot edit id, is_active or is_manager values! |

---

### 5.4. **Deletando supervisor pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/supervisors/:id`

### Exemplo de Request:

```
DELETE /supervisors/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                      |
| --------- | ------ | ---------------------------------------------- |
| id        | string | Identificador único do supervisor (Supervisor) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "Supervisor successfully deleted"
}
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 403 Forbidden  | Invalid token.        |
| 403 Forbidden  | access only managers. |
| 404 Not found  | Supervisor not found. |

---

## 6. **Teams**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Team é definido como:

| Campo        | Tipo   | Descrição                             |
| ------------ | ------ | ------------------------------------- |
| id           | string | Identificador único do time.          |
| supervisor   | object | O supervisor que faz parte do time.   |
| collaborator | array  | Um array com os colaboradores do time |

### Endpoints

| Método | Rota                   | Descrição                                               |
| ------ | ---------------------- | ------------------------------------------------------- |
| POST   | /teams                 | Criação de um time.                                     |
| GET    | /teams                 | Lista todos os times.                                   |
| GET    | /teams/:id             | Lista um time usando seu ID como parâmetro.             |
| GET    | /teams/supervisor/:id  | Lista um time usando o ID do supervisor como parâmetro. |
| DELETE | /teams/:id             | Deleta um time usando seu ID como parâmetro.            |
| POST   | /team/:id/collaborator | Adiciona um colaborador ao time.                        |
| DELETE | /team/:id/collaborator | Remove um colaborador do time.                          |

---

### 6.1. **Criação do time**

[ Voltar para os Endpoints ](#5-endpoints)

### `/teams`

### Exemplo de Request:

```
POST /teams
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "supervisorId": "87b711e2-c75d-4de2-9d7f-47ba27503ebb"
}
```

### Schema de Validação com Yup:

```javascript
  id: yup
    .string()
    .default(() => uuidv4())
    .transform(() => uuidv4())
    .notRequired(),
  supervisorId: yup.string().required(),
  collaborator: yup
    .array()
    .transform(() => [])
    .default(() => [])
    .notRequired(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "207df14e-0535-4663-b69d-28e1a2c3ac2f",
  "supervisor": {
    "id": "87b711e2-c75d-4de2-9d7f-47ba27503ebb",
    "name": "Roberto",
    "telephone": "995397895",
    "email": "beto@gmail.com",
    "is_manager": true,
    "is_active": true
  },
  "collaborator": []
}
```

### Possíveis Erros:

| Código do Erro            | Descrição                                 |
| ------------------------- | ----------------------------------------- |
| 403 Forbidden             | Invalid token.                            |
| 403 Forbidden             | access only for supervisors and managers. |
| 404 Not found             | supervisor not found.                     |
| 500 Internal server error | supervisor is already in a team.          |

---

### 6.2. **Listando times**

[ Voltar para os Endpoints ](#5-endpoints)

### `/teams`

### Exemplo de Request:

```
GET /teams
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "207df14e-0535-4663-b69d-28e1a2c3ac2f",
    "supervisor": {
      "id": "87b711e2-c75d-4de2-9d7f-47ba27503ebb",
      "name": "Edmar",
      "telephone": "995397895",
      "email": "ed2010@gmail.com",
      "is_manager": true,
      "is_active": true
    },
    "collaborator": []
  },
  {
    "id": "309gd14e-0535-4663-b69d-28e1a2c3ub7h",
    "supervisor": {
      "id": "87b711e2-c75d-4de2-9d7f-47ba27503ebb",
      "name": "Roberto",
      "telephone": "995397201",
      "email": "beto18@gmail.com",
      "is_manager": true,
      "is_active": true
    },
    "collaborator": []
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição      |
| -------------- | -------------- |
| 403 Forbidden  | Invalid token. |
| 403 Forbidden  | Unauthorized.  |

---

### 6.3. **Listando time pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/teams/:id`

### Exemplo de Request:

```
GET /teams/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do time (Team) |

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
  "id": "207df14e-0535-4663-b69d-28e1a2c3ac2f",
  "supervisor": {
    "id": "87b711e2-c75d-4de2-9d7f-47ba27503ebb",
    "name": "Roberto",
    "telephone": "995397895",
    "email": "beto@gmail.com",
    "is_manager": true,
    "is_active": true
  },
  "collaborator": []
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 403 Forbidden  | Invalid token.  |
| 403 Forbidden  | Unauthorized.   |
| 404 Not found  | team not found. |

---

### 6.4. **Listano time pelo ID do supervisor**

[ Voltar aos Endpoints ](#5-endpoints)

### `/teams/supervisor/:id`

### Exemplo de Request:

```
GET /teams/supervisor/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                      |
| --------- | ------ | ---------------------------------------------- |
| id        | string | Identificador único do supervisor (Supervisor) |

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
  "id": "207df14e-0535-4663-b69d-28e1a2c3ac2f",
  "supervisor": {
    "id": "87b711e2-c75d-4de2-9d7f-47ba27503ebb",
    "name": "Roberto",
    "telephone": "995397895",
    "email": "beto@gmail.com",
    "is_manager": true,
    "is_active": true
  },
  "collaborator": []
}
```

### Possíveis Erros:

| Código do Erro | Descrição                           |
| -------------- | ----------------------------------- |
| 403 Forbidden  | Invalid token.                      |
| 403 Forbidden  | access only managers.               |
| 404 Not found  | supervisor not found.               |
| 409 Conflict   | supervisor is not part of any team. |

---

### 6.5. **Deletando time pelo ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/teams/:id`

### Exemplo de Request:

```
DELETE /teams/:id
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do time (Team) |

### Corpo da Requisição:

```json
vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "team successfully deleted"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 403 Forbidden  | Invalid token.                            |
| 403 Forbidden  | access only for supervisors and managers. |
| 404 Not found  | team not found.                           |

---

### 6.6. **Adicionando colaborador ao time**

[ Voltar aos Endpoints ](#5-endpoints)

### `/teams/:id/collaborator`

### Exemplo de Request:

```
POST /teams/:id/collaborator
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do time (Team) |

### Corpo da Requisição:

```json
{
  "collaboratorId": "c4740867-bd15-4e28-974f-372fd708bc6c"
}
```

### Schema de Validação com Yup:

```javascript
collaboratorId: yup.string().required();
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "message": "collaborator successfully added"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                        |
| -------------- | ------------------------------------------------ |
| 403 Forbidden  | Invalid token.                                   |
| 403 Forbidden  | access only for supervisors and managers.        |
| 404 Not found  | team not found.                                  |
| 404 Not found  | collaborator not found.                          |
| 409 Conflict   | collaborator is already registered in this team. |

---

### 6.7. **Removendo colaborador do time**

[ Voltar aos Endpoints ](#5-endpoints)

### `/teams/:id/collaborator`

### Exemplo de Request:

```
DELETE /teams/:id/collaborator
Host: https://internet-services-support.herokuapp.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do time (Team) |

### Corpo da Requisição:

```json
{
  "collaboratorId": "222e1c68-13c8-4f11-8858-bbc8bffe0937"
}
```

### Schema de Validação com Yup:

```javascript
collaboratorId: yup.string().required();
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
202 Accepted
```

```json
{
  "message": "collaborator successfully removed"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                    |
| -------------- | -------------------------------------------- |
| 403 Forbidden  | Invalid token.                               |
| 403 Forbidden  | access only for supervisors and managers.    |
| 404 Not found  | team not found.                              |
| 404 Not found  | collaborator not found.                      |
| 409 Conflict   | collaborator is not registered in this team. |

---
