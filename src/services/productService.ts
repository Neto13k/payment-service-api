import pool from "../db/db";
import { Product } from "../types/index";

async function getAllProducts(): Promise<Product[]> {
    try {
        const result = await pool.query("SELECT * FROM products");
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
    }
}

async function getProductById(id: number): Promise<Product | null> {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        throw error;
    }
}

async function createProduct(product: Product): Promise<Product> {
    try {
        const result = await pool.query(
            "INSERT INTO products (name, description, price, category_id, stock, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [product.name, product.description, product.price, product.category_id, product.stock, product.active]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        throw error;
    }
}

async function updateProduct(id: number, product: Product): Promise<Product | null> {
    try {
        const result = await pool.query(
            "UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, stock = $5, active = $6 WHERE id = $7 RETURNING *",
            [product.name, product.description, product.price, product.category_id, product.stock, product.active, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        throw error;
    }
}

async function deleteProduct(id: number): Promise<boolean> {
    try {
        const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        throw error;
    }
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };