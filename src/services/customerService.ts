import pool from '../db/db'
import { Customer } from '../types/index'

async function getAllCustomers(): Promise<Customer[]> {
    try {
        const result = await pool.query('SELECT * FROM customers');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    } 
}

async function getCustomerById(id: number): Promise<Customer | null> {
    try {
        const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        throw error;
    }
}

async function createCustomer(customer: Customer): Promise<Customer> {
    try {
        const result = await pool.query(
            'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [customer.name, customer.email, customer.phone]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        throw error;
    }
}

async function updateCustomer(id: number, customer: Customer): Promise<Customer | null> {
    try {
        const result = await pool.query(
            'UPDATE customers SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
            [customer.name, customer.email, customer.phone, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        throw error;
    } 
}

async function deleteCustomer(id: number): Promise<boolean> {
    try {
        const result = await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        throw error;
    }
}

export { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer }