import pool from '../db/db'
import { Category } from '../types/index'

async function getAllCategories(): Promise<Category[]>{
    try {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
} catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
}
}

async function getCategoryById(id: number): Promise<Category | null> {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar categoria por ID:', error);
        throw error;
    }
}

async function createCategory(category: Category): Promise<Category> {
    try {
        const result = await pool.query(
            'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
            [category.name, category.description]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error;
    }
}

async function updateCategory(id: number, category: Category): Promise<Category | null> {
    try {
        const result = await pool.query(
            'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [category.name, category.description, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error;
    }
}

async function deleteCategory(id: number): Promise<boolean> {
    try {
        const result = await pool.query('DELETE FROM categories WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        throw error;
    }
}

export {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory}
