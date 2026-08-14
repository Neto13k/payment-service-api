import pool from '../db/db';
import { Order } from '../types/index';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

async function getAllOrders(): Promise<Order[]> {
    try {
        const result = await pool.query('SELECT * FROM orders');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}

async function getOrderById(id: number): Promise<Order | null> {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar pedido por ID:', error);
        throw error;
    }
}

async function createOrder(order: Order): Promise<{ order: Order; checkoutUrl: string | null }> {
    try {
        const stripeSession = await stripe.checkout.sessions.create({
            mode : 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        unit_amount: Math.round(order.total * 100), // Convertendo para centavos
                        product_data: {
                            name: 'Order Payment',
                        },
                    },
                    quantity: 1,
                },
            ]
        });
        const stripe_session_id = stripeSession.id;
        const result = await pool.query(
            'INSERT INTO orders (customer_id, coupon_id, status, subtotal, discount, total, stripe_session_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [order.customer_id, order.coupon_id, order.status, order.subtotal, order.discount, order.total, stripe_session_id]
        );
        return { order: result.rows[0], checkoutUrl: stripeSession.url};
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        throw error;
    }
}

async function updateOrder(id: number, order: Order): Promise<Order | null> {
    try {
        const result = await pool.query(
            'UPDATE orders SET customer_id = $1, coupon_id = $2, status = $3, subtotal = $4, discount = $5, total = $6, stripe_session_id = $7 WHERE id = $8 RETURNING *',
            [order.customer_id, order.coupon_id, order.status, order.subtotal, order.discount, order.total, order.stripe_session_id, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        throw error;
    }
}

async function deleteOrder(id: number): Promise<boolean> {
    try {
        const result = await pool.query('DELETE FROM orders WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        throw error;
    }
}

export { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };