# Order Management API

A Order Management API é uma aplicação backend desenvolvida em **NestJS** para gerenciar pedidos e produtos. Ela oferece endpoints RESTful para criar, ler, atualizar e excluir (CRUD) produtos e pedidos, além de integrar-se com um banco de dados PostgreSQL para persistência de dados.

---

## 🚀 Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações server-side escaláveis e eficientes.
- **PostgreSQL**: Banco de dados relacional para armazenamento de dados.
- **TypeORM**: ORM (Object-Relational Mapping) para interação com o banco de dados.
- **Docker**: Para conteinerização da aplicação e banco de dados.
- **Docker Compose**: Para orquestração dos contêineres.
- **Joi**: Para validação de variáveis de ambiente.
- **PgAdmin**: Interface gráfica para gerenciamento do banco de dados PostgreSQL.

---

## 📋 Requisitos

Antes de executar a aplicação, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Como Executar a Aplicação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/order-management-api.git
cd order-management-api
```

### 2. Configure as Variáveis de Ambiente

```bash
# Banco de Dados
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=user
DATABASE_PASSWORD=1234
DATABASE_NAME=order_management

# PgAdmin
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin

# Aplicativo NestJS
APP_PORT=3000
NODE_ENV=development
```

### 3. Inicie os Contêineres com Docker Compose

```bash
docker-compose up -d
```

Isso irá:

Criar um contêiner para o banco de dados PostgreSQL.

Criar um contêiner para o PgAdmin (interface gráfica para o banco de dados).

Criar um contêiner para a aplicação NestJS.

### 4. Acesse a Aplicação

```bash
API NestJS: Disponível em http://localhost:3000.
```

```bash
PgAdmin: Disponível em http://localhost:5050. Use as credenciais definidas no .env para fazer login.
```

📚 Endpoints da API
A API oferece os seguintes endpoints:

```bash
Produtos
GET /products: Lista todos os produtos.

GET /products/:id: Retorna um produto específico pelo ID.

POST /products: Cria um novo produto.

PUT /products/:id: Atualiza um produto existente.

DELETE /products/:id: Exclui um produto.

Pedidos
GET /orders: Lista todos os pedidos.

GET /orders/:id: Retorna um pedido específico pelo ID.

POST /orders: Cria um novo pedido.

PUT /orders/:id: Atualiza um pedido existente.

DELETE /orders/:id: Exclui um pedido.
```
