import pool from '../db/db';
import { OrderItem } from '../types/index';

async function getAllOrderItems(): Promise<OrderItem[]> {
    try {
        const result = await pool.query("SELECT * FROM order_items");
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar orderItems:", error);
        throw error;
    }
}

async function getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
    try {
        const result = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [orderId]);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar orderItems por orderId:", error);
        throw error;
    }
}

async function createOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    try {
        const result = await pool.query(
            "INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.unit_price, orderItem.total_price]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar orderItem:", error);
        throw error;
    }
}

async function updateOrderItem(id: number, orderItem: OrderItem): Promise<OrderItem | null> {
    try {
        const result = await pool.query(
            "UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, unit_price = $4, total_price = $5 WHERE id = $6 RETURNING *",
            [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.unit_price, orderItem.total_price, id]
        );
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Erro ao atualizar orderItem:", error);
        throw error;
    }
}

async function deleteOrderItem(id: number): Promise<boolean> {
    try {
        const result = await pool.query("DELETE FROM order_items WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error("Erro ao deletar orderItem:", error);
        throw error;
    }
}



export { getOrderItemsByOrderId, getAllOrderItems, createOrderItem, updateOrderItem, deleteOrderItem };