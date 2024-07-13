# Processo Seletivo Creatus - Backend

Nesse repositório se encontra a teste técnico para a empresa Creatus.

## Descrição da API

- API feita em NodeJS com o Framework Fastify, usando o ORM Prisma com o banco de dados MongoDB
- Foi usado o Docker, com o intuito de facilitar a criação de um ambiente comum
- Todas informações são inseridas na API, são validadas pela biblioteca ZOD

## Endpoints
A API expõem 7 endpoints, são eles:
- `POST /login` – Autenticação do usuário
- `POST /users` - Criação de um novo usuário
- `GET /users` - Listagem de todos os usuários
- `GET /users/:id` - Detalhes de um usuário específico
- `PUT /users/:id` - Atualização de um usuário específico
- `DELETE /users/:id` - Exclusão de um usuário específico
- `GET /users/report` - Geração de um relatório em CSV

### Autenticação do usuário
`POST /login`

Deverá aceitar uma requisição em formato JSON com os seguintes parâmetros:

| atributo | descrição |
| --- | --- |
| **email** | obrigatório, único, string |
| **password** | obrigatório, string |

Caso a requisição for válida, ela retornara status code 200, juntamente com o token JWT do usuário autenticado. Caso informar credenciais inválidas ele retornara status code 401 junto da mensagem de erro.


Exemplo de requisição válida:
```json
{
    "email" : "fulano@email.com",
    "password" : "password",
}
```

### Criação de um novo usuário
`POST /users`

Deverá aceitar uma requisição em formato JSON com os seguintes parâmetros:

| atributo | descrição |
| --- | --- |
| **name** | obrigatório, string |
| **email** | obrigatório, único, string |
| **password** | obrigatório, string |
| **level** | obrigatório, number de 1 a 5 |

Caso a requisição for válida, ela retornara status code 201, juntamente com as informações do usuário criado. Se informar um email já cadastrado no sistema, ele retornará status code 409, junto da mensagem de erro. Caso informar algum campo inválido ele retornara status code 400 junto da mensagem de erro.

Exemplo de requisição válida:
```json
{
    "name" : "fulano",
    "email" : "fulano@email.com",
    "password" : "password",
    "level" : 3
}
```

### Listagem de todos os usuários
`GET /users`

Esse endpoint retorna uma lista com as informações de todos os usuários cadastrados na aplicação, juntamente com status code 200. Caso nenhum usuário tenha sido cadastrado, retornara uma lista vazia.


### Detalhes de um usuário específico
`GET /users/:id`

Esse endpoint retorna dados especifico de um usuário cadastrado na aplicação, cujo o id do mesmo foi informado na url da requisição, juntamente com status code 200. Caso não encontre um usuário com id informado, retornara status code 404 junto da mensagem de erro.


## Atualização de um usuário específico
`PUT /users/:id`

Esse endpoint fara alterações em um usuário especifico da aplicação, cujo o id do mesmo foi informado na url da requisição, juntamente com status code 200 e as novas informações do usuário. Caso não encontre um usuário com aquele id, retornara status code 404, junto da mensagem de erro. Caso o novo email informado já estiver em uso, retornara status code 409, junto da mensagem de erro.

Exemplo de requisição válida:
```json
{
    "name" : "fulano",
    "email" : "fulano@email.com",
    "password" : "password",
    "level" : 3
}
```

## Exclusão de um usuário específico
`DELETE /users/:id`

Esse endpoint deletara um usuário especifico da aplicação, cujo o id do mesmo foi informado na url da requisição, juntamente com status code 204. Caso não encontre um usuário com aquele id, retornara status code 404, junto da mensagem de erro.

## Geração de um relatório em CSV
`GET /users/report`

Esse endpoint retornará um CSV com todos os usuários cadastrados na aplicação, juntamente com status code 200. Importante lembrar que para acessar esse endpoint precisa estar logado na aplicação e ter level 4 ou maior. Caso o usuário não esteja logado, retornara status code 401 com a mensagem de erro. Caso o usuário não tenha level 4 ou maior, retornara status code 403 com a mensagem de erro.


## Como rodar o projeto

- Primeiro você deve criar o container do Docker, com o comando:

```bash
docker compose build
```

- Após isso, iremos subir o container recém-criado, com o comando:

```bash
docker compose up -d
```

