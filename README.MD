# payment-service-api — Planejamento do Projeto

## Estrutura de Pastas

```
payment-service-api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db/
│   ├── types/
│   └── server.ts
├── db/
│   └── schema.sql
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Stack

- Node.js + TypeScript + Express
- PostgreSQL + pg
- Stripe
- Nodemailer + PDFKit
- dotenv + tsx

## Entidades no Banco

| Tabela | Descrição |
|--------|-----------|
| `customers` | Clientes |
| `categories` | Categorias de produtos |
| `products` | Produtos com preço e estoque |
| `coupons` | Cupons de desconto |
| `orders` | Pedidos |
| `order_items` | Itens de cada pedido |
| `payment_attempts` | Tentativas de pagamento |

## Rotas

### Customers
- `POST /customers` - cadastrar com e-mail de boas-vindas
- `GET /customers` - listar com paginação
- `GET /customers/:id` - buscar com histórico de pedidos
- `PUT /customers/:id` - atualizar
- `DELETE /customers/:id` - remover

### Categories
- `POST /categories`
- `GET /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### Products
- `POST /products`
- `GET /products` - com filtro por categoria e paginação
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

### Coupons
- `POST /coupons`
- `GET /coupons`
- `DELETE /coupons/:id`

### Orders
- `POST /orders` - cria pedido, aplica cupom se houver, gera link Stripe
- `GET /orders` - listar com paginação
- `GET /orders/:id` - detalhes com itens e tentativas de pagamento
- `POST /orders/:id/refund` - solicitar reembolso via Stripe

### Webhooks
- `POST /webhooks/stripe` - confirma pagamento, envia e-mail com PDF do comprovante

## Funcionalidades

- CRUD completo de customers, categories, products e coupons
- Criação de pedido com múltiplos itens e aplicação de cupom
- Geração de link de pagamento via Stripe
- Webhook do Stripe para confirmar pagamento de forma assíncrona
- E-mail de boas-vindas no cadastro do cliente
- E-mail de confirmação de pagamento com comprovante em PDF anexado
- E-mail de confirmação de reembolso
- Reembolso via Stripe