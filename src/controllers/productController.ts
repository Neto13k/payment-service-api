import {Request, Response} from 'express';
import * as productService from '../services/productService';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = req.body;
        const newProduct = await productService.createProduct(product);
        res.status(201).json({ message: "Produto criado com sucesso", product: newProduct });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ error: "Erro ao criar produto" });
    }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({ message: "Produtos encontrados", products });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos" });
    }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const product = await productService.getProductById(id);
        if (!product) {
            res.status(404).json({ error: "Produto não encontrado" });
            return;
        }
        res.status(200).json({ message: "Produto encontrado", product });
    } catch (error) {
        console.error("Erro ao buscar produto por ID:", error);
        res.status(500).json({ error: "Erro ao buscar produto por ID" });
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const product = req.body;
        const updatedProduct = await productService.updateProduct(id, product);
        if (!updatedProduct) {
            res.status(404).json({ error: "Produto não encontrado" });
            return;
        }
        res.status(200).json({ message: "Produto atualizado com sucesso", product: updatedProduct });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: "Erro ao atualizar produto" });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            res.status(404).json({ error: "Produto não encontrado" });
            return;
        }
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
};

export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };