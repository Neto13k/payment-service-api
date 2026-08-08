import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = req.body;
        const newCategory = await categoryService.createCategory(category);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria' });
    }
};

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
};

const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const category = await categoryService.getCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar categoria por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar categoria por ID' });
    }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const category = req.body;
        const updatedCategory = await categoryService.updateCategory(id, category);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deleted = await categoryService.deleteCategory(id);
        if (deleted) {
            res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } else {    
        res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
};

export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };