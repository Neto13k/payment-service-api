-- ==========================================
-- PAYMENT SERVICE API
-- Esquema do Banco de Dados
-- ==========================================

-- =========================
-- Tabela de clientes
-- =========================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- Tabela de categorias
-- =========================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- Tabela de produtos
-- =========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,

    category_id INT NOT NULL,

    name VARCHAR(150) NOT NULL,
    description TEXT,

    price NUMERIC(10,2) NOT NULL
        CHECK (price >= 0),

    stock INT NOT NULL DEFAULT 0
        CHECK (stock >= 0),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

-- =========================
-- Tabela de cupons de desconto
-- =========================
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,

    code VARCHAR(30) UNIQUE NOT NULL,

    discount_type VARCHAR(20) NOT NULL
        CHECK (discount_type IN ('percentage', 'fixed')),

    discount_value NUMERIC(10,2) NOT NULL
        CHECK (discount_value > 0),

    expires_at TIMESTAMP,

    usage_limit INT
        CHECK (usage_limit >= 0),

    used_count INT NOT NULL DEFAULT 0
        CHECK (used_count >= 0),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- Tabela de pedidos
-- =========================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,

    customer_id INT NOT NULL,

    coupon_id INT,

    status VARCHAR(20) NOT NULL
        DEFAULT 'pending'
        CHECK (status IN (
            'pending',
            'paid',
            'cancelled',
            'refunded'
        )),

    subtotal NUMERIC(10,2) NOT NULL
        CHECK (subtotal >= 0),

    discount NUMERIC(10,2) NOT NULL DEFAULT 0
        CHECK (discount >= 0),

    total NUMERIC(10,2) NOT NULL
        CHECK (total >= 0),

    stripe_session_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_orders_coupon
        FOREIGN KEY (coupon_id)
        REFERENCES coupons(id)
        ON DELETE SET NULL
);

-- =========================
-- Tabela de itens dos pedidos
-- =========================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NOT NULL,

    quantity INT NOT NULL
        CHECK (quantity > 0),

    unit_price NUMERIC(10,2) NOT NULL
        CHECK (unit_price >= 0),

    total_price NUMERIC(10,2) NOT NULL
        CHECK (total_price >= 0),

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
);

-- =========================
-- Tabela de tentativas de pagamento
-- =========================
CREATE TABLE payment_attempts (
    id SERIAL PRIMARY KEY,

    order_id INT NOT NULL,

    stripe_payment_intent VARCHAR(255),

    status VARCHAR(30) NOT NULL
        CHECK (status IN (
            'pending',
            'processing',
            'failed',
            'paid',
            'refunded'
        )),

    amount NUMERIC(10,2) NOT NULL
        CHECK (amount >= 0),

    error_message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_attempts_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

-- ==========================================
-- Índices para otimizar consultas
-- ==========================================

-- Produtos por categoria
CREATE INDEX idx_products_category
ON products(category_id);

-- Apenas produtos ativos
CREATE INDEX idx_products_active
ON products(active);

-- Pedidos de um cliente
CREATE INDEX idx_orders_customer
ON orders(customer_id);

-- Busca por status do pedido
CREATE INDEX idx_orders_status
ON orders(status);

-- Itens pertencentes a um pedido
CREATE INDEX idx_order_items_order
ON order_items(order_id);

-- Histórico de vendas de um produto
CREATE INDEX idx_order_items_product
ON order_items(product_id);

-- Tentativas de pagamento de um pedido
CREATE INDEX idx_payment_attempts_order
ON payment_attempts(order_id);

-- Busca de clientes por e-mail
CREATE INDEX idx_customers_email
ON customers(email);

-- Busca de cupons pelo código
CREATE INDEX idx_coupons_code
ON coupons(code);