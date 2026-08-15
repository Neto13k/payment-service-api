import pool from "../db/db";
import { PaymentAttempt } from "../types/index";

const getAllPaymentAttempts = async (): Promise<PaymentAttempt[]> => {
    try {
        const result = await pool.query("SELECT * FROM payment_attempts");
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar tentativas de pagamento:", error);
        throw error
    }
};

const getPaymentAttemptById = async (id: number): Promise<PaymentAttempt | null> => {
    try {
        const result = await pool.query("SELECT * FROM payment_attempts WHERE id = $1", [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Erro ao buscar tentativa de pagamento por ID:", error);
        throw error;
    }
};

const createPaymentAttempt = async (paymentAttempt: PaymentAttempt): Promise<PaymentAttempt> => {
    try {
        const result = await pool.query(
            "INSERT INTO payment_attempts (order_id, stripe_payment_intent, status, amount, error_message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [paymentAttempt.order_id, paymentAttempt.stripe_payment_intent, paymentAttempt.status, paymentAttempt.amount, paymentAttempt.error_message]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar tentativa de pagamento:", error);
        throw error;
    } 
};

const updatePaymentAttempt = async (id: number, paymentAttempt: PaymentAttempt): Promise<PaymentAttempt | null> => {
    try {
        const result = await pool.query(
            "UPDATE payment_attempts SET order_id = $1, stripe_payment_intent = $2, status = $3, amount = $4, error_message = $5 WHERE id = $6 RETURNING *",
            [paymentAttempt.order_id, paymentAttempt.stripe_payment_intent, paymentAttempt.status, paymentAttempt.amount, paymentAttempt.error_message, id]
        );
        return result.rows[0] || null;
    }
    catch (error) {
        console.error("Erro ao atualizar tentativa de pagamento:", error);
        throw error;
    }
};


const deletePaymentAttempt = async (id: number): Promise<boolean> => {
    try {
        const result = await pool.query("DELETE FROM payment_attempts WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error("Erro ao deletar tentativa de pagamento:", error);
        throw error;
    }
};

export { getAllPaymentAttempts, getPaymentAttemptById, createPaymentAttempt, updatePaymentAttempt, deletePaymentAttempt };