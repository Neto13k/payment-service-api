import { Request, Response } from 'express';
import * as customerService from '../services/customerService';

const createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = req.body;
        const newCustomer = await customerService.createCustomer(customer);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
};

const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
};

const getCustomerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const customer = await customerService.getCustomerById(id);
        if (customer) {
            res.status(200).json(customer);
        }
        else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente por ID' });
    }
};

const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const customer = req.body;
        const updatedCustomer = await customerService.updateCustomer(id, customer);
        if (updatedCustomer) {
            res.status(200).json(updatedCustomer);
        }
        else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const deletedCustomer = await customerService.deleteCustomer(id);
        if (deletedCustomer) {
            res.status(200).json({ message: 'Cliente excluído com sucesso' });
        }
        else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
};

export { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer };